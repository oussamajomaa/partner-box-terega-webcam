import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ],

    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ]
})

export class MaterialModule {}
