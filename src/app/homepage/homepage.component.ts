import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataService } from '../services/data.service';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isUser: boolean;
  isAdmin: boolean;

  constructor(
    private dataService: DataService,
    public authService: AuthService,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit() {
    this.permissionsService.isAuthorized$().subscribe(permission => {
      if (permission === 'user') {
        this.isUser = true;
        this.dataService.putMyPartners().subscribe(
          () => console.log('Partenaire enregistré !')
        )
      } else if (permission === 'admin') {
        this.isAdmin = true;
      }
    });
  }

}
