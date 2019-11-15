import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes/index";
import "reflect-metadata";

const PORT = 3000;

const startServer = async () => {
  try {

    // connect to the mysql database
    await createConnection();

    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  } catch (error) {
    console.error(`error starting database: ${error}`);
  }
};

startServer();
