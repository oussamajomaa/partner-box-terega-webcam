import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Badge } from '../models/badge';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  isFetch = false;
  isEdit = false;
  color = '#FFFFFF';
  currentForm = new Date();

  lastWeek = moment().subtract(7, 'days').toDate();
  currentWeek = moment().toDate();
  nextWeek = moment().add(7, 'days').toDate();
  badges: Badge[] = [];
  calendar = this.createCalendar(this.lastWeek, this.currentWeek, this.nextWeek);

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBadgesUser().subscribe(
      (badges: Badge[]) => {
        this.badges = badges;
        this.initCalendar();
        this.isFetch = true;
      }
    );
  }

  changeDate(newDate: Date): void {
    const d1 = new Date(newDate.getTime());
    const d2 = new Date(newDate.getTime());
    const d3 = new Date(newDate.getTime());

    this.lastWeek = new Date(d1.setDate(d1.getDate() - 7));
    this.currentWeek = d2;
    this.nextWeek = new Date(d3.setDate(d3.getDate() + 7));

    this.calendar = this.createCalendar(this.lastWeek, this.currentWeek, this.nextWeek);
    this.initCalendar();
  }

  getDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
    // return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  createCalendar(lastWeek: Date, currentWeek: Date, nextWeek: Date): any {
    return [
      [
        [
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 0))}_AM`,
            color: '#FFFFFF'
          },
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 0))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 1))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 1))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 2))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 2))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 3))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 3))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 4))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(lastWeek, 4))}_PM`,
            color: '#FFFFFF',
          }
        ]
      ],
      [
        [
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 0))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 0))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 1))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 1))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 2))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 2))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 3))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 3))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 4))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(currentWeek, 4))}_PM`,
            color: '#FFFFFF',
          }
        ]
      ],
      [
        [
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 0))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 0))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 1))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 1))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 2))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 2))}_PM`,
            color: '#FFFFFF',
          },
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 3))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 3))}_PM`,
            color: '#FFFFFF',
          }
        ],
        [
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 4))}_AM`,
            color: '#FFFFFF',
          },
          {
            id: `${this.getDate(this.getDayFromMonday(nextWeek, 4))}_PM`,
            color: '#FFFFFF',
          }
        ]
      ]
    ];
  }

  getDayFromMonday(d: Date, moreDay: number): Date {
    d = new Date(d.getTime());
    const day = d.getDay();
    const diff = d.getDate() - day + moreDay + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  putBadges(id: string, color: string): void {
    let location = (color === '#3AE374' ? 'site' : color === '#FFF200' ? 'remote' : 'none');

    const badgeWithoutUserId: Badge = {
      BadgeId: id,
      BadgeLocation: location
    };

    this.dataService.putBadges(badgeWithoutUserId).subscribe(
      () => {
        this.dataService.openSnackBar('Changement effectué !', 'snack-bar-success', 2000);
      },
      () => {
        this.dataService.openSnackBar('Impossible de changer le badgeage !', 'snack-bar-danger', undefined);
      }
    );
  }

  deleteBadges(id: string): void {
    this.dataService.deleteBadges(id).subscribe(
      () => {
        this.dataService.openSnackBar('Badgeage supprimé !', 'snack-bar-danger', 2000);
      },
      () => {
        this.dataService.openSnackBar('Impossible de changer le badgeage !', 'snack-bar-danger', undefined);
      }
    );
  }

  editColor(halfDay: any, week: number, day: number) {
    if (this.isEdit) {
      const halfDayMoment = (halfDay.id.split('_')[1] === 'AM' ? 0 : 1);
      this.calendar[week][day][halfDayMoment].color = this.color;
      if (this.color === '#FFFFFF') {
        this.deleteBadges(halfDay.id);
      } else {
        this.putBadges(halfDay.id, this.color);
      }
    }
  }

  initCalendar(): void {
    for (const badge of this.badges) {
      for (const week of this.calendar) {
        for (const day of week) {
          for (const halfDay of day) {
            if (halfDay.id === badge.BadgeId) {
              halfDay.color = (badge.BadgeLocation === 'site' ? '#3AE374' : badge.BadgeLocation === 'remote' ? '#FFF200' : '#FFFFFF');
            }
          }
        }
      }
    }
  }
}
