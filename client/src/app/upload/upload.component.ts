import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { DatasetService } from '../services/dataset.service';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
    SQL: any;

    name = new FormControl('', [Validators.required]);
    description = new FormControl('', [Validators.required]);
    form: FormGroup;

    constructor(
        public fb: FormBuilder,
        public datasetService: DatasetService,
        private state: StateService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            name: [''],
            description: [''],
            file: [''],
        });
    }

    ngOnInit() {}

    async submitDataset() {
        const uploadResponse = await this.datasetService.uploadDataSetFile(
            this.form.value.file._files[0],
            this.name.value,
        );

        if (!uploadResponse.dbFilePath) {
            return;
        }

        await this.datasetService.newDataset(
            this.name.value,
            this.name.value,
            uploadResponse.dbFilePath,
        );

        const state = await this.state.get();
        const username = state.currentUser.username;
        this.router.navigateByUrl(`${username}`);
    }
}
