import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes/index';
import 'reflect-metadata';
import { User } from './entity/user.model';
import { Dataset } from './entity/dataset.model';
import { Metric } from './entity/metric.model';
import * as fileUpload from 'express-fileupload';

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        // connect to the mysql database
        const connection = await createConnection({
            type: "mysql",
            host: "db",
            port: 3306,
            username: "root",
            password: "admin",
            database: "db",
            name: "default",
            logging: true,
            entities: [
                User,
                Dataset,
                Metric
            ]
        });
        await connection.synchronize();

        // create new express app
        const app = express();

        // call application middleware
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

        // setup temp file storage
        app.use(
            fileUpload({
                createParentPath: true,
            }),
        );

        // setup application routes
        app.use('/api', routes);

        // start the server
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}/api`);
        });

        app.on('error', (error) => {
            throw error;
        });
    } catch (error) {
        console.error(`error starting database: ${error}`);
    }
};

startServer();
