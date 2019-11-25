import { Metric } from './metric.model';

export interface Dataset {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    metric: Metric;
}
