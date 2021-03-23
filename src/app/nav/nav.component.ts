import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformationsComponent } from '../dialog/informations/informations.component';
import { AuthService } from '@auth0/auth0-angular';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  isAdmin: boolean;
  isUser: boolean;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    public permissionsService: PermissionsService
  ) { }

  ngOnInit() {
    this.permissionsService.isAuthorized$().subscribe(permission => {
      if (permission === 'user') {
        this.isUser = true;
      } else if (permission === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  showInformations(): void {
    this.dialog.open(InformationsComponent);
  }

  logout(): void {
    this.authService.logout({ returnTo: window.location.origin });
  }
}
