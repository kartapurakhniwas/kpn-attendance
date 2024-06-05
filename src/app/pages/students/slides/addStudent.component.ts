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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StudentsComponent } from '../students.component';


@Component({
  standalone: true,
  imports: [CommonModule,
    MatMenuModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, 
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule, MatSelectModule],
  selector: 'students-add-component',
  template: ` 
  <div class="slide-header">
        <h3>Add Student</h3>
        <button mat-icon-button (click)="students.addRowFlag = false">
            <!-- <mat-icon>close</mat-icon> -->
            <i class="ki-duotone ki-cross">
            <span class="path1"></span>
            <span class="path2"></span>
            </i>
        </button>
    </div>
    <div class="slide-body">
        <form>
            <div class="input-wrap">
                <label class="form-label">Location Name</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Location Name">
                </mat-form-field>
            </div>
    
            <div class="input-wrap">
                <label class="form-label">Status</label>
                <mat-form-field appearance="outline">
                  <mat-select>
                    <mat-option value="active">Active</mat-option>
                    <mat-option value="inactive">Inactive</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
    
        
        </form>
    </div>
    <div class="slide-footer">
        <button mat-button (click)="students.addRowFlag = false">Close</button>
        <button mat-flat-button color="primary" class="primary">Search</button>
    </div>
  `,
})
export class AddStudent {

  constructor(public students: StudentsComponent) {}

  refresh() {
    
  }

}