import { Dataset } from './dataset.model';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    datasets: Dataset[];
    token: string;
}
