import { getDbInfo } from "../controller";
import { Table } from "../entity/metric.model";

export const loadTestDb = (): Promise<Table[]> => {
    const testDbPath = 'chinook.db';
    return new Promise(async (resolve, reject) => {
        resolve(await getDbInfo(testDbPath))
    });
};