import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/user.model';
import * as faker from 'faker';
import { Dataset } from '../entity/dataset.model';
import { Metric } from '../entity/metric.model';
import { loadTestDb } from '../assets/test.db';

export class SeedTestData1573855208544 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            // create some test users
            const savedUsers = await Promise.all(
                [1, 2, 3].map(async () => {
                    return await createFakeUsers(queryRunner);
                }),
            );

            // create some test datasets for
            // the test users
            const userDatasets = await Promise.all(
                savedUsers
                    .reduce(
                        (acc, cur) => acc.concat(Array(1).fill(cur)),
                        [] as User[],
                    )
                    .map(async (user) => {
                        return await createFakeDatasets(queryRunner, user);
                    }),
            );

            // create some test metrics
            // for all the test datasets
            await Promise.all(
                userDatasets.map(async (dataset) => {
                    return await createFakeMetrics(queryRunner, dataset);
                }),
            );
        } catch (error) {
            console.error(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // delete any users with the role "TEST_USER"~
        // also deletes any associated rows in other tables
        const userRepository = await getRepository(User);
        return await userRepository.delete({
            role: 'TEST_USER',
        });
    }
}

const createFakeUsers = async (queryRunner: QueryRunner): Promise<User> => {
    // create fake attributes
    const user = new User();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = 'password';
    user.hashPassword();
    user.role = 'TEST_USER';
    // save user to database
    return await queryRunner.manager.getRepository(User).save(user);
};

const createFakeDatasets = async (
    queryRunner: QueryRunner,
    user: User,
): Promise<Dataset> => {
    // create fake attributes
    let dataset = new Dataset();
    dataset.name = faker.lorem.word();
    dataset.description = faker.lorem.sentence(3);
    // assign the fake dataset's user
    dataset.user = user;
    //save dataset to database
    return await queryRunner.manager.getRepository(Dataset).save(dataset);
};

const createFakeMetrics = async (
    queryRunner: QueryRunner,
    dataset: Dataset,
): Promise<Metric> => {
    // create fake attributes
    let metric = new Metric();
    metric.dataset = dataset;
    // load the test db file
    const tables = await loadTestDb();
    metric.dbPath = 'chinook.db';
    metric.tables = tables;
    //save dataset to database
    return await queryRunner.manager.getRepository(Metric).save(metric);
};
