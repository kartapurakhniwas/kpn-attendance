import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DriverLogComponent } from '../driver-log.component';
import { MatInputModule } from '@angular/material/input';


@Component({
  standalone: true,
  imports: [CommonModule,
    MatMenuModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, 
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule],
  selector: 'search-component',
  template: ` 
  <div class="slide-header">
        <h3>Search</h3>
        <button mat-icon-button (click)="driverLog.searchFlag = false">
            <!-- <mat-icon>close</mat-icon> -->
            <i class="ki-duotone ki-cross">
                <span class="path1"></span>
                <span class="path2"></span>
                </i>
        </button>
    </div>
    <div class="slide-body">
        <form>
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Drivers</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Drivers">
                </mat-form-field>
            </div>
    
            <div class="input-wrap flex-input-bx">
                <label class="form-label">From</label>
                <mat-form-field appearance="outline">
                    <input matInput [matDatepicker]="picker">
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
            </div>
    
            <div class="input-wrap flex-input-bx">
                <label class="form-label">To</label>
                <mat-form-field appearance="outline">
                    <input matInput [matDatepicker]="picker1">
                    <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
                    <mat-datepicker #picker1></mat-datepicker>
                </mat-form-field>
            </div>
    
        
        </form>
    </div>
    <div class="slide-footer">
        <button mat-button (click)="driverLog.searchFlag = false">Close</button>
        <button mat-flat-button color="primary" class="primary">Search</button>
    </div>
  `,
})
export class SearchDriverLog {

  constructor(public driverLog: DriverLogComponent) {}

  refresh() {
    
  }

}