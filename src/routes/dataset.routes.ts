import { Router } from "express";
import { DatasetController } from "../controller";
import { checkToken } from "../middleware";
import { checkRole } from "../middleware";

const router = Router();

// get all datasets
router.get("/", [checkToken, checkRole(["ADMIN"])], DatasetController.listAll);

//  get one dataset
router.get(
    "/:id([0-9]+)",
    [checkToken, checkRole(["ADMIN"])],
    DatasetController.getOneById
);

// create a new dataset
router.post("/", [checkToken, checkRole(["ADMIN"])], DatasetController.newDataset);

// edit one dataset
router.patch(
    "/:id([0-9]+)",
    [checkToken, checkRole(["ADMIN"])],
    DatasetController.editDataset
);

// delete one dataset
router.delete(
    "/:id([0-9]+)",
    [checkToken, checkRole(["ADMIN"])],
    DatasetController.deleteDataset
);

export default router;
