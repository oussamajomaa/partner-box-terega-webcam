import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../models/badge';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ENDPOINT } from '../terraform-vars';
import { AuthService } from '@auth0/auth0-angular';
import { pluck, take, switchMap } from 'rxjs/operators';
import { Contract } from '../models/contract';
import { Partner } from '../models/partner';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  getBadgesUser(): Observable<Badge[]> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        return this.http.get<Badge[]>(`${ENDPOINT}/badges?partnerId=${sub}`);
      })
    );
  }

  putBadgesNow(badgeLocation: string): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        var today = moment.utc().local();
        var todayDate = today.format('YYYY-MM-DD');
        var todayHour = parseInt(today.format('HH'));
        
        if (todayHour < 12) {
          var badgeId = `${todayDate}_AM`;
        } else {
          var badgeId = `${todayDate}_PM`;
        }
        
        let badge: Badge = {
          PartnerId: sub,
          BadgeId: badgeId,
          BadgeLocation: badgeLocation,
        }

        return this.http.put(`${ENDPOINT}/badges`, badge);
      })
    );
  }

  putBadges(badgeWithoutPartnerId: Badge): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        const badge: Badge = {
          PartnerId: sub,
          ...badgeWithoutPartnerId
        }
        return this.http.put(`${ENDPOINT}/badges`, badge);
      })
    );
  }

  deleteBadges(badgeId: string): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        return this.http.delete(`${ENDPOINT}/badges?partnerId=${sub}&badgeId=${badgeId}`);
      })
    );
  }

  deleteContracts(contractId: string): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        return this.http.delete(`${ENDPOINT}/contracts?adminId=${sub}&contractId=${contractId}`);
      })
    );
  }

  getContracts(): Observable<Contract[]> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        return this.http.get<Contract[]>(`${ENDPOINT}/contracts?adminId=${sub}`);
      })
    );
  }

  postContracts(contractWithoutAdminId: Contract): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        const contract: Contract = {
          AdminId: sub,
          ...contractWithoutAdminId
        }
        return this.http.post<Contract>(`${ENDPOINT}/contracts`, contract);
      })
    );
  }

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(`${ENDPOINT}/partners`);
  }

  putPartners(partner: Partner): Observable<any> {
    return this.http.put(`${ENDPOINT}/partners`, partner);
  }

  putMyPartners(): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        const partner: Partner = {
          PartnerId: user.sub,
          PartnerName: `${user.given_name} ${user.family_name.toUpperCase()}`,
          PartnerDailyRate: 0,
          ContractId: "none",
        }
        return this.http.put<Partner>(`${ENDPOINT}/partners`, partner);
      })
    );
  }

  putContracts(contractWithoutAdminId: Contract): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      pluck('sub'),
      switchMap(sub => {
        const contract: Contract = {
          AdminId: sub,
          ...contractWithoutAdminId
        }
        return this.http.put<Contract>(`${ENDPOINT}/contracts`, contract)
      })
    );
  }

  openSnackBar(message: string, panelClass: string, duration: number): void {
    this.snackBar.open(message, 'OK', {
      duration,
      panelClass
    });
  }
}
