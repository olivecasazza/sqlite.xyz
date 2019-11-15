import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Dataset } from '../entity/dataset.model';
import { request } from 'https';

export class DatasetController {
  static newDataset = async (req: Request, res: Response) => {
    // validade if the parameters are ok
    const errors = await validate({ ...req.body });
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // try and create the dataset
    const datasetRepository = getRepository(Dataset);
    try {
      await datasetRepository.create({ ...req.body });
    } catch (e) {
      res.status(409).send('was unable to create new dataset');
      return;
    }
    // if all ok, send 201 response
    res.status(201).send('dataset created');
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
    const userId: string = req.params.userId;
    //  get the user from database
    const datasetRepository = getRepository(Dataset);
    try {
      const datasets = await datasetRepository.find({
        select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
        relations: ['user', 'metric'],
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
        relations: ['user', 'metric'],
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
    const errors = await validate({ ...req.body });
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //try to safe, if fails, that means username already in use
    try {
      await datasetRepository.update(id, { ...req.body });
    } catch (e) {
      res.status(409).send('unable to update dataset');
      return;
    }
    //after all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteDataset = async (req: Request, res: Response) => {
    //get the id from the url
    const id = req.params.id;
    const datasetRepository = getRepository(Dataset);
    let dataset: Dataset;
    try {
      dataset = await datasetRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('dataset not found');
      return;
    }
    datasetRepository.delete(id);
    //after all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}
