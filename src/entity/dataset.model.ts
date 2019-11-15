import { IsNotEmpty, Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Metric } from './metric.model';
import { User } from './user.model';

@Entity()
export class Dataset {
    /** PRIMARY KEYS */
    @PrimaryGeneratedColumn('uuid')
    id: number;

    /** ATTRIBUTES */
    // the name of the dataset
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    name: string;

    // a short description
    // of the dataset
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @Length(0, 255)
    description: string;

    // the date the dataset
    // information was created
    @Column({
        type: 'date',
        nullable: false,
    })
    @CreateDateColumn()
    createdAt: Date;

    // the date the dataset
    // information was last updated
    @Column({
        type: 'date',
        nullable: false,
    })
    @UpdateDateColumn()
    updatedAt: Date;

    /** RELATIONS */
    // foreign key for datasets
    // a user has many datasets
    // associated with their account
    @ManyToOne(
        () => User,
        (user) => user.datasets,
        { onDelete: 'CASCADE' },
    )
    user: User;

    // a dataset has one metric object
    // associated with it which saves
    // metadata and extra information about
    // a dataset
    @OneToOne(
        (type) => Metric,
        (metric) => metric.dataset,
    )
    metric: Metric;
}
