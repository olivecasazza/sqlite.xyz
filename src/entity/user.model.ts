import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Dataset } from './dataset.model';

@Entity()
@Unique(['username', 'email'])
export class User {
    /** PRIMARY KEYS */
    @PrimaryGeneratedColumn('uuid')
    id: number;

    /** ATTRIBUTES */
    // a user's first name
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    firstName: string;

    // a user's last name
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    lastName: string;

    // a user's user name
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    username: string;

    // a user's email address
    // (must be unique)
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    email: string;

    // a user's password
    // stored as a hash using bcrypt
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    @IsNotEmpty()
    @Length(4, 100)
    password: string;

    // a user's role which tells
    // what resources they should
    // have access to
    @Column({
        type: 'varchar',
        nullable: false,
    })
    @IsNotEmpty()
    role: string;

    // the date the account
    // was created
    @Column({
        type: 'date',
        nullable: false,
    })
    @CreateDateColumn()
    createdAt: Date;

    // the date the account
    // information was last updated
    @Column({
        type: 'date',
        nullable: false,
    })
    @UpdateDateColumn()
    updatedAt: Date;

    /** RELATIONS */
    @OneToMany(
        () => Dataset,
        (dataset) => dataset.user,
    )
    datasets: Dataset[];

    /** METHODS */
    // take the plain text password
    // and hash it using bcrypt
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    // given the current user account
    // check if a plain text password
    // matches the saved hash
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
