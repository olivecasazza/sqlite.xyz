import { Router } from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import dataset from "./dataset.routes";

// create an express router
const routes = Router();

// tell the express router to
// use our created routese
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/datasets", dataset);

export default routes;
