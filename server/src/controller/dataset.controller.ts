import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Dataset } from '../entity/dataset.model';
import { Metric, Table } from '../entity/metric.model';
import { User } from '../entity/user.model';
import initSqlJs from 'sql.js';
import { readFileSync } from 'fs';

const BASE_UPLOAD_PATH =
    '/home/colin/Code/SDSU/sci_databases/sqlitexyz/server/databases';

export class DatasetController {
    static newDataset = async (req: Request, res: Response) => {
        try {
            // create new dataset
            const newDataset = new Dataset();
            newDataset.name = req.body.dataset.name;
            newDataset.description = req.body.dataset.description;
            newDataset.user = await getRepository(User).findOne(
                req.body.userId,
            );
            const savedDataset = await getRepository(Dataset).save(newDataset);

            // try and create the cooresponding metrics
            const tables = await getDbInfo(req.body.dbFilePath);
            const newMetric = new Metric();
            newMetric.tables = tables;
            newMetric.dbPath = req.body.dbFilePath;
            newMetric.dataset = savedDataset;
            const savedMetric = await getRepository(Metric).save(newMetric);

            // if no errors were thrown by
            // now creation was successfull
            return res
                .status(201)
                .send({ ...savedDataset, metric: savedMetric });
        } catch (error) {
            console.error(error);
            return res.status(400).send(error);
        }
    };

    static uploadDatasetFile = async (req: Request, res: Response) => {
        const requestFile = (req as any).files;
        const tmpFilePath = `${BASE_UPLOAD_PATH}/${requestFile.file.md5}`;
        await requestFile.file.mv(tmpFilePath);
        res.status(201).send({ dbFilePath: requestFile.file.md5 });
    };

    static downloadDataset = async (req: Request, res: Response) => {
        //  get the id from the url
        const id: string = req.params.id;
        //  get the user from database
        const datasetRepository = getRepository(Dataset);
        try {
            const dataset = await datasetRepository.findOneOrFail(id, {
                select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
                relations: ['metric'],
            });
            const file = `${BASE_UPLOAD_PATH}/${dataset.metric.dbPath}`;
            res.download(file);
        } catch (error) {
            res.status(404).send('dataset not found');
        }
    };

    static listAll = async (req: Request, res: Response) => {
        //  get datasets from database
        const datasetRepository = getRepository(Dataset);
        const datasets = await datasetRepository.find({
            select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
            relations: ['user', 'metric'],
        });
        //  send the datasets object
        res.send(datasets);
    };

    static listByUserId = async (req: Request, res: Response) => {
        //  get the id from the url
        const userId: string = req.params.id;
        //  get the user from database
        const datasetRepository = getRepository(Dataset);
        try {
            const datasets = await datasetRepository.find({
                select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
                where: {
                    user: userId,
                },
            });
            res.send(datasets);
        } catch (error) {
            res.status(404).send('datasets not found');
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        //  get the id from the url
        const id: string = req.params.id;
        //  get the user from database
        const datasetRepository = getRepository(Dataset);
        try {
            const dataset = await datasetRepository.findOneOrFail(id, {
                select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
                relations: ['metric'],
            });
            res.send(dataset);
        } catch (error) {
            res.status(404).send('dataset not found');
        }
    };

    static editDataset = async (req: Request, res: Response) => {
        //get the id from the url
        const id = req.params.id;
        // see if the dataset exists
        const datasetRepository = getRepository(Dataset);
        try {
            await datasetRepository.findOneOrFail(id);
        } catch (error) {
            //if not found, send a 404 response
            res.status(404).send('dataset not found');
            return;
        }
        // make sure the new dataset is a valid format
        const errors = await validate({
            ...req.body,
        });
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        //try to safe, if fails, that means username already in use
        try {
            await datasetRepository.update(id, {
                ...req.body,
            });
        } catch (e) {
            return res.status(409).send('unable to update dataset');
        }
        //after all send a 204 (no content, but accepted) response
        return res.status(204).send();
    };

    static deleteDataset = async (req: Request, res: Response) => {
        //get the id from the url
        const id = req.params.id;
        const datasetRepository = getRepository(Dataset);
        let dataset: Dataset;
        try {
            dataset = await datasetRepository.findOneOrFail(id);
            datasetRepository.delete(id);
            //after all send a 204 (no content, but accepted) response
            res.status(204).send();
        } catch (error) {
            return res.status(404).send('dataset not found');
        }
    };
}

export const getDbInfo = async (path): Promise<Table[]> => {
    try {
        const filebuffer = readFileSync(`${BASE_UPLOAD_PATH}/${path}`);
        const SQL = await initSqlJs();
        const db = new SQL.Database(filebuffer);

        const query: [] = db.exec(`
        SELECT m.name as tableName, p.name as columnName
        FROM sqlite_master m
        left outer join pragma_table_info((m.name)) p on m.name <> p.name
        order by tableName, columnName;`)[0].values;

        let tables = [];
        query.forEach((e) => {
            if (tables[e[0]]) {
                tables[e[0]] = tables[e[0]].concat(e[1]);
            } else {
                tables[e[0]] = [e[1]];
            }
        });
        return tables;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
