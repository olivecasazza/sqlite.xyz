import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../services/dataset.service';
import { BehaviorSubject } from 'rxjs';
import { Dataset } from '../models/dataset.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dataset-list',
    templateUrl: './dataset-list.component.html',
    styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent {
    datasetColumns: string[] = [
        'name',
        'description',
        'createdAt',
        'updatedAt',
        'open',
    ];
    userDatasets: BehaviorSubject<Dataset[]> = new BehaviorSubject<Dataset[]>(
        null,
    );

    constructor(
        private datasetService: DatasetService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.loadUserDatabases();
    }

    openDataSet = (dataset: Dataset) => {
        const currentUserName = this.route.snapshot.paramMap.get('username');
        this.router.navigate([`${currentUserName}/${dataset.id}/`]);
    };

    loadUserDatabases = async () => {
        const userDatasets = await this.datasetService.fetchDatabaseList();
        console.dir(userDatasets);
        this.userDatasets.next(userDatasets);
    };
}
