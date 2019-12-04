import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dataset } from '../models/dataset.model';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    constructor(private http: HttpClient, private state: StateService) {}

    newDataset = async (
        name: string,
        description: string,
        dbFilePath: string,
    ): Promise<string> => {
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
    };

    deleteDataset = async (dataset: Dataset) => {
        const url = `${environment.apiUrl}/datasets/${dataset.id}`;
        return await this.http.delete<{ dbFilePath: string }>(url).toPromise();
    };

    uploadDataSetFile = async (file, name) => {
        const url = `${environment.apiUrl}/datasets/upload`;
        const formData = new FormData();
        formData.append('file', file, name);
        return await this.http
            .post<{ dbFilePath: string }>(url, formData)
            .toPromise();
    };

    downloadDatasetFile = async (datasetId) => {
        const url = `${environment.apiUrl}/datasets/download/${datasetId}`;
        return await this.http.get(url, { responseType: 'blob' }).toPromise();
    };

    fetchDataset = async (datasetId) => {
        // create the request paramaters
        const url = `${environment.apiUrl}/datasets/${datasetId}`;
        // try and make the request
        // and upload new dataset to database
        try {
            return await this.http.get<any>(url).toPromise();
        } catch (error) {
            console.error(
                '[dataset.service.ts]: error getting dataset by id',
                error,
            );
        }
    };

    fetchDatabaseList = async () => {
        // get the current user to attach to request
        const user = await this.state.get();
        // create the request paramaters
        const url = `${environment.apiUrl}/datasets/all/${user.currentUser.id}`;
        // try and make the request
        // and upload new dataset to database
        try {
            return await this.http.get<any>(url).toPromise();
        } catch (error) {
            console.error(
                '[dataset.service.ts]: error getting datasets for user',
                error,
            );
        }
    };
}
