import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { DatasetService } from '../services/dataset.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
    SQL: any;
    datasetName = new FormControl('', [Validators.required]);
    datasetDescription = new FormControl('', [Validators.required]);
    datasetFile = new FormControl('', [Validators.required]);

    form: FormGroup;
    progress = 0;

    constructor(public fb: FormBuilder, public datasetService: DatasetService) {
        this.form = this.fb.group({
            name: [''],
            description: [''],
            blob: [''],
        });
    }

    ngOnInit() {}

    uploadFile(event) {
        this.form.patchValue({
            blob: (event.target as HTMLInputElement).files[0],
        });
        this.form.get('blob').updateValueAndValidity();
    }

    async submitDataset() {
        const uploadResponse = await this.datasetService.uploadDataSetFile(
            this.form.value.blob,
            this.form.value.name,
        );

        if (!uploadResponse.dbFilePath) return;

        console.dir(uploadResponse);
        this.datasetService.newDataset(
            this.form.value.name,
            this.form.value.description,
            uploadResponse.dbFilePath,
        );
    }
}
