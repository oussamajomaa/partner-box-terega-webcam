import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Contract } from 'src/app/models/contract';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.css']
})
export class ListContractsComponent implements OnInit {

  isFetch: Boolean;
  isEmpty: Boolean;
  contracts: MatTableDataSource<Contract[]>;
  displayedColumns: string[]; 

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {
    this.isFetch = false;
    this.isEmpty = false;
    this.contracts = new MatTableDataSource<Contract[]>();
    this.displayedColumns = ['Nom', 'Entreprise', 'Commande', 'Consommé', 'Durée du contrat', 'Actions'];
  }

  ngOnInit(): void {
    this.dataService.getContracts().subscribe(
      (response: any) => {
        if (response.length === 0) {
          this.isEmpty = true;
        }
        this.contracts.data = response;
        this.isFetch = true;
      },
      () => this.dataService.openSnackBar('Impossible de charger les contrats', 'snack-bar-danger', undefined)
    );
  }

  onEdit(contract: any): void {
    this.router.navigate(['/contrats', 'modifier', contract.ContractId], { state: contract });
  }

  onDelete(contractId: string): void {
    if (confirm('Vous êtes sûr de vouloir supprimer le contrat ?')) {
      this.dataService.deleteContracts(contractId).subscribe(
        () => this.ngOnInit(),
        () => this.dataService.openSnackBar('Impossible de supprimer le contrat', 'snack-bar-danger', undefined)
      );
    }
  }

  calculateDiff(d1: string, d2: string): number {
    let m1 = moment(d1);
    let m2 = moment(d2);
    return m1.diff(m2, 'days');
  }

  calculatePercentage(partial: number, total: number) {
    return (100 * partial) / total;
  }

  colorSpending(percent: number) {
    if (percent >= 90) return { color: 'red'}
    else if (percent >= 80) return { color: 'orange'}
    else if (percent >= 0) return { color: 'green'}
  }
}
