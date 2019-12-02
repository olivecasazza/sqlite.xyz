import { Router } from 'express';
import { DatasetController } from '../controller';
import { checkToken } from '../middleware';
import { checkRole } from '../middleware';

const router = Router();

// get all datasets
router.get(
    '/:id',
    // [checkToken, checkRole(['ADMIN'])],
    DatasetController.getOneById,
);

router.get(
    '/all/:id',
    // [checkToken, checkRole(['ADMIN'])],
    DatasetController.listByUserId,
);

// create a new dataset
router.post(
    '/',
    // [checkToken, checkRole(['ADMIN'])],
    DatasetController.newDataset,
);

// edit one dataset
router.patch(
    '/:id',
    // [checkToken, checkRole(['ADMIN'])],
    DatasetController.editDataset,
);

// delete one dataset
router.delete(
    '/:id',
    // [checkToken, checkRole(['ADMIN'])],
    DatasetController.deleteDataset,
);

// upload a new dataset file
router.post('/upload', DatasetController.uploadDatasetFile);

// download a dataset file given a dataset id
router.get('/download/:id', DatasetController.downloadDataset);

export default router;
