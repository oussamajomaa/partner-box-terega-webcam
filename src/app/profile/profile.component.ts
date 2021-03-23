import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataService } from '../services/data.service';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  isUser: boolean;
  isAdmin: boolean;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.permissionsService.isAuthorized$().subscribe(permission => {
      if (permission === 'user') {
        this.isUser = true;
      } else if (permission === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  onClock(place: string): void {
    this.dataService.putBadgesNow(place).subscribe(
      () => {
        this.dataService.openSnackBar('Badgeage effectué !', 'snack-bar-success', 2000);
      },
      () => {
        this.dataService.openSnackBar('Impossible de badger !', 'snack-bar-danger', undefined);
      }
    );
  }
}
