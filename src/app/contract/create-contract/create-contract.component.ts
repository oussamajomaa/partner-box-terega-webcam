import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  isCreate: boolean;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.isCreate = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      ContractOrder: ['', Validators.required],
      ContractName: ['', Validators.required],
      ContractStartDate: ['', Validators.required],
      ContractEndDate: ['', Validators.required],
      ContractCompany: ['', Validators.required]
    });
  }

  onPostContracts() {
    this.formGroup.value.ContractStartDate = moment(this.formGroup.value.ContractStartDate).format('YYYY-MM-DD');
    this.formGroup.value.ContractEndDate = moment(this.formGroup.value.ContractEndDate).format('YYYY-MM-DD');
    this.dataService.postContracts(this.formGroup.value).subscribe(
      () => {
        this.router.navigate(['contrats']);
      },
      () => {
        this.dataService.openSnackBar('Impossible de créer ce contrat', 'snack-bar-danger', undefined);
      }
    );
  }
}
