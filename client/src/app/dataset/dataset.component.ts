import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasetService } from '../services/dataset.service';
import { BehaviorSubject } from 'rxjs';
import { Dataset } from '../models/dataset.model';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent {
    dataset: BehaviorSubject<Dataset> = new BehaviorSubject<Dataset>(null);

    constructor(
        private datasetService: DatasetService,
        private route: ActivatedRoute,
    ) {
        this.getDataset();
    }

    getDataset = async () => {
        const datasetId = this.route.snapshot.paramMap.get('datasetId');
        const dataset = await this.datasetService.fetchDataset(datasetId);
        this.dataset.next(dataset);
    };

    downloadDataset = async () => {
        const datasetId = this.route.snapshot.paramMap.get('datasetId');
        const downloadedFile = await this.datasetService.downloadDatasetFile(datasetId);
        importedSaveAs(downloadedFile, this.dataset.value.name);
    }
}
