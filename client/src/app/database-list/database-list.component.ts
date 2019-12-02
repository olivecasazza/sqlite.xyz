import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../services/dataset.service';
import { BehaviorSubject } from 'rxjs';
import { Dataset } from '../models/dataset.model';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.scss']
})
export class DatabaseListComponent implements OnInit {

  userDatasets: BehaviorSubject<Dataset[]> = new BehaviorSubject<Dataset[]>(null);

  constructor(private datasetService: DatasetService) { }

  ngOnInit() {
    this.loadUserDatabases();
  }


  loadUserDatabases = async () => { 
    const userDatasets = await this.datasetService.fetchDatabaseList();
    console.dir(userDatasets);
    this.userDatasets.next(userDatasets);
  }
}
