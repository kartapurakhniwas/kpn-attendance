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
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCheckboxModule,
    MatMenuModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, 
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule],
  selector: 'doneForDay',
  template: ` 
  <div class="slide-header">
        <h3 class="d-flex align-items-center">Done For Day Event <span class="text-badge ms-3">Amarjit Singh</span> </h3>
        <button mat-icon-button (click)="driverLog.backToYard = false">
            <!-- <mat-icon>close</mat-icon> -->
            <i class="ki-duotone ki-cross">
              <span class="path1"></span>
              <span class="path2"></span>
              </i>
        </button>
    </div>
    <div class="slide-body">
        <form>
            <div class="row">
                <div class="col-5">
                    <div class="input-wrap">
                        <label class="form-label">Event Date</label>
                        <mat-form-field appearance="outline">
                            <input matInput [matDatepicker]="picker">
                            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                        </mat-form-field>
                    </div>
                </div>
                <div class="col-5">
                    <div class="input-wrap">
                        <label class="form-label">Logout Window <span style="color:red">( IN MIN )</span></label>
                        <mat-form-field appearance="outline">
                            <input matInput placeholder="0">
                        </mat-form-field>
                    </div>
                </div>
                <div class="col-2">
                    <button mat-flat-button color="primary" class="primary" style="margin-top: 25px;">Submit</button>
                </div>
            </div>
            <mat-checkbox>Notify Driver</mat-checkbox>
        </form>
        <div class="table-responsive mt-2">
            <table class="table">
                <thead>
                    <tr>
                        <th>Create Date</th>
                        <th>Event Date</th>
                        <th>Event Duration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>02/03/2024</td>
                        <td>02/03/2024 04:34</td>
                        <td>02/03/2024</td>
                        <td><mat-checkbox></mat-checkbox></td>
                    </tr>
                    <tr>
                        <td>02/03/2024</td>
                        <td>02/03/2024 04:34</td>
                        <td>02/03/2024</td>
                        <td><mat-checkbox></mat-checkbox></td>
                    </tr>
                    <tr>
                        <td>02/03/2024</td>
                        <td>02/03/2024 04:34</td>
                        <td>02/03/2024</td>
                        <td><mat-checkbox></mat-checkbox></td>
                    </tr>
                    <tr>
                        <td>02/03/2024</td>
                        <td>02/03/2024 04:34</td>
                        <td>02/03/2024</td>
                        <td><mat-checkbox></mat-checkbox></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  `,
})
export class DoneForDayComponent {

  constructor(public driverLog: DriverLogComponent) {}

  refresh() {
    
  }

}