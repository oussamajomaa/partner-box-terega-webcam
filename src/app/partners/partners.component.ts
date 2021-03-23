import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract';
import { Partner } from '../models/partner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  areFetch: Boolean[];
  partners: MatTableDataSource<Partner>;
  displayedColumns: string[];
  contracts: Contract[];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = ['Nom', 'Taux journalier', 'Contrat', 'Actions'];
    this.areFetch = [false, false];
    this.partners = new MatTableDataSource<Partner>();
  }

  ngOnInit(): void {
    this.dataService.getContracts().pipe(
      map(x => {
        x.unshift({
          ContractId: "none",
          ContractName: "--- Non assigné ---"
        } as Contract);
        return x;
      })
    ).subscribe(
      (contracts: Contract[]) => {
        this.contracts = contracts;
        this.areFetch[0] = true
      }
    )
    this.dataService.getPartners().subscribe(
      (partners: Partner[]) => {
        this.partners.data = partners;
        this.areFetch[1] = true;
      },
      () => {
        this.dataService.openSnackBar('Impossible de charger les utilisateurs', 'snack-bar-danger', undefined);
        this.areFetch[1] = true;
      }
    );
  }

  onSubmit(partner: Partner) {
    if (partner.PartnerDailyRate === null) { partner.PartnerDailyRate = 0 }
    this.dataService.putPartners(partner).subscribe(
      () => this.dataService.openSnackBar('Partenaire modifié !', 'snack-bar-success', 2000),
      () => this.dataService.openSnackBar('Impossible de modifier le partenaire !', 'snack-bar-danger', undefined)
    );
  }

  isEmpty(): boolean {
    if (this.partners.data.length === 0) { return true; }
  }

  isFetch(): boolean {
    return this.areFetch.every(
      (val) => val === true
    );
  }

  isReserve(partnerContract: string) {
    let res = false;
    for (const contract of this.contracts) {
      if (contract.ContractId !== partnerContract) {
        res = true;
      } else { 
        return false;
      }
    }
    return res;
  }
}
