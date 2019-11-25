import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes/index';
import 'reflect-metadata';

const PORT =  process.env.PORT || 8000;

const startServer = async () => {
    try {
        // connect to the mysql database
        await createConnection();

        // create new express app
        const app = express();

        // call application middleware
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        // setup application routes
        app.use('/api', routes);

        // start the server
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}/api`);
        });

        app.on('error', (error) => {throw error})
    } catch (error) {
        console.error(`error starting database: ${error}`);
    }
};

startServer();
