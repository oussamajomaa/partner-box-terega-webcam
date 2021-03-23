import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  isFetch: Boolean;
  isEdit: Boolean;
  formGroup: FormGroup;
  contractId: string;
  contracts: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.isEdit = true;
    this.isFetch = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.contractId = this.route.snapshot.params.id;

    if (!history.state.ContractId) {
      this.dataService.getContracts().subscribe(
        (contracts: any[]) => {
          const index = contracts.findIndex(element => element.ContractId === this.contractId);
          this.contracts = contracts;
          this.formGroup.patchValue({
            ContractOrder: contracts[index].ContractOrder,
            ContractName: contracts[index].ContractName,
            ContractStartDate: new Date(contracts[index].ContractStartDate),
            ContractEndDate: new Date(contracts[index].ContractEndDate),
            ContractCompany: contracts[index].ContractCompany,
          });
          this.isFetch = true;
        }
      );
    } else {
      this.formGroup.patchValue({
        ContractOrder: history.state.ContractOrder,
        ContractName: history.state.ContractName,
        ContractStartDate: new Date(history.state.ContractStartDate),
        ContractEndDate: new Date(history.state.ContractEndDate),
        ContractCompany: history.state.ContractCompany,
      });
      this.isFetch = true;
    }
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      ContractOrder: ['', Validators.required],
      ContractName: ['', Validators.required],
      ContractStartDate: ['', Validators.required],
      ContractEndDate: ['', Validators.required],
      ContractCompany: ['', Validators.required]
    });
  }

  onEditContract(): void {
    this.isEdit = false;
    
    this.formGroup.value.ContractStartDate = moment(this.formGroup.value.ContractStartDate).format('YYYY-MM-DD');
    this.formGroup.value.ContractEndDate = moment(this.formGroup.value.ContractEndDate).format('YYYY-MM-DD');
    this.formGroup.value.ContractId = this.contractId;

    this.dataService.putContracts(this.formGroup.value).subscribe(
      () => {
        this.router.navigate(['/contrats']);
      },
      () => {
        this.dataService.openSnackBar('Impossible de modifier le contrat', 'snack-bar-danger', undefined);
      }
    );
  }
}
