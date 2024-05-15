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
import { MatSelectModule } from '@angular/material/select';


@Component({
  standalone: true,
  imports: [CommonModule,
    MatMenuModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule,
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule],
  selector: 'addNewLogComponent',
  template: ` 
  <div class="slide-header">
        <h3>Add New Log Entry</h3>
        <button mat-icon-button (click)="driverLog.addRowFlag = false">
            <!-- <mat-icon>close</mat-icon> -->
            <i class="ki-duotone ki-cross">
                <span class="path1"></span>
                <span class="path2"></span>
                </i>
        </button>
    </div>
     <div class="slide-body">
        <form>
            <h3 class="heading">Driver & Truck Details</h3>
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Driver Name</label>
                <mat-form-field appearance="outline">
                    <mat-select>
                        <mat-option value="option1">John</mat-option>
                        <mat-option value="option1">Doe</mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Truck</label>
                <mat-form-field appearance="outline">
                    <mat-select>
                        <mat-option value="option1">John</mat-option>
                        <mat-option value="option1">Doe</mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
            <div class="hr-light"></div>
            <h3 class="heading">Login Details</h3>
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Login Truck Date/Time</label>
                <mat-form-field appearance="outline">
                    <input matInput [matDatepicker]="df">
                    <mat-datepicker-toggle matIconSuffix [for]="df"></mat-datepicker-toggle>
                    <mat-datepicker #df></mat-datepicker>
                </mat-form-field>
            </div> 
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Login Truck Address</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Enter Address">
                </mat-form-field>
            </div> 
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Logout Truck Date/Time</label>
                <mat-form-field appearance="outline">
                    <input matInput [matDatepicker]="kh">
                    <mat-datepicker-toggle matIconSuffix [for]="kh"></mat-datepicker-toggle>
                    <mat-datepicker #kh></mat-datepicker>
                </mat-form-field>
            </div> 
            <div class="input-wrap flex-input-bx">
                <label class="form-label">Logout Truck Address</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Enter Address">
                </mat-form-field>
            </div> 
        </form>
    </div>
    <div class="slide-footer">
        <button mat-button (click)="driverLog.searchFlag = false">Close</button>
        <button mat-flat-button color="primary" class="primary">Save</button>
    </div>
  `,
})
export class AddNewLogComponent {

  constructor(public driverLog: DriverLogComponent) {}

  refresh() {
    
  }

}