import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dataset } from '../models/dataset.model';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    constructor(private http: HttpClient, private state: StateService) {}

    newDataset = async (name: string, description: string, dbFilePath: string): Promise<string> => {
        // get the current user to attach to request
        const user = await this.state.get();
        // create the request paramaters
        const url = `${environment.apiUrl}/datasets`;
        const requestBody = {
            dbFilePath,
            userId: user.currentUser.id,
            dataset: { name, description },
        };
        // try and make the request
        // and upload new dataset to database
        try {
            return await this.http.post<any>(url, requestBody).toPromise();
        } catch (error) {
            console.error(
                '[dataset.service.ts]: error creating new dataset',
                error,
            );
        }
    }

    uploadDataSetFile = async (file, name) => {
        const url = `${environment.apiUrl}/datasets/upload`;
        const formData = new FormData();
        formData.append('file', file, name);
        return await this.http.post<{ dbFilePath: string }>(url, formData).toPromise();
    }

    fetchDatabaseList = async () => {
        // get the current user to attach to request
        const user = await this.state.get();
        // create the request paramaters
        const url = `${environment.apiUrl}/datasets/${user.currentUser.id}`;
        // try and make the request
        // and upload new dataset to database
        try {
            return await this.http.get<any>(url).toPromise();
        } catch (error) {
            console.error(
                '[dataset.service.ts]: error creating new dataset',
                error,
            );
        }
    }
}
