import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Dataset } from './dataset.model';

export interface Table {
    tableName: string;
    columns: string[];
};

@Entity()
export class Metric {
    /** PRIMARY KEYS */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** ATTRIBUTES */
    // the data that the metrics
    // were first created
    @Column({
        type: 'varchar',
        nullable: false,
    })
    dbPath: string;

    // a dict object describing
    // the tables in the db as well
    // as the columns in each table
    // todo: refactor tables to it's own table
    @Column({
        type: 'simple-json',
        nullable: false,
    })
    tables: Table[];

    // the date the metrics
    // object was created
    @Column({
        type: 'date',
        nullable: false,
    })
    @CreateDateColumn()
    createdAt: Date;

    // the data that the metrics
    // were last updated
    @Column({
        type: 'date',
        nullable: false,
    })
    @UpdateDateColumn()
    updatedAt: Date;

    /** RELATIONS */
    // foreign key for dataset metrics
    // a dataset has one metric object
    // associated with it which saves
    // metadata and extra information about
    // a dataset
    @OneToOne(
        (type) => Dataset,
        (dataset) => dataset.metric,
        { onDelete: 'CASCADE' },
    ) // specify inverse side as a second parameter
    @JoinColumn()
    dataset: Dataset;
}
