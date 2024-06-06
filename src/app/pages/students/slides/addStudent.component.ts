import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StudentsComponent } from '../students.component';
import { StudentsService } from '../../../core/services/students/students.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalVariable } from '../../../core/services/global.service';


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
        <form [formGroup]="Form">
            <div class="input-wrap">
                <label class="form-label">Student Name</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Student Name" formControlName="student_name">
                </mat-form-field>
            </div>
            <div class="input-wrap">
                <label class="form-label">Address</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Address" formControlName="address">
                </mat-form-field>
            </div>
            <div class="input-wrap">
                <label class="form-label">Phone</label>
                <mat-form-field appearance="outline">
                    <input matInput placeholder="Phone" formControlName="phone">
                </mat-form-field>
            </div>
    
            <div class="input-wrap">
                <label class="form-label">Subject</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="subject">
                    <mat-option [value]="2">Frontend</mat-option>
                    <mat-option [value]="3">Backend</mat-option>
                    <mat-option [value]="4">Basics</mat-option>
                    <mat-option [value]="5">Typing</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
        </form>
    </div>
    <div class="slide-footer">
        <button mat-button (click)="students.addRowFlag = false">Close</button>
        <button (click)="save()" mat-flat-button color="primary" class="primary">Save</button>
    </div>
  `,
})
export class AddStudent {

  constructor(public students: StudentsComponent, public srv: StudentsService,
    private _snackBar: MatSnackBar, public gl: GlobalVariable
  ) {}

  ngOnInit() {
    this.refresh();
    console.log();
    
  }

  refresh() {
    console.log('(this.gl.setRowData', this.gl.setRowData);
    
    if (this.gl.setRowData) {
      this.setValue(this.gl.setRowData);
    }
  }

  setValue(data:any) {
    this.Form.controls['student_name'].setValue(data.student_name);
    this.Form.controls['address'].setValue(data.address);
    this.Form.controls['phone'].setValue(data.phone);
    this.Form.controls['subject'].setValue(data.subject);
  }

  Form = new FormGroup({
    student_name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    subject: new FormControl(0, [Validators.required]),
  }) as any;

  save() {
    let data = this.Form.value;
    if(this.Form.valid) {
      if(this.gl.setRowData) {
        // data.id = this.gl.setRowData.id;
        this.srv.updateStudent(data, this.gl.setRowData.id).then((res) => {
          this.students.addRowFlag = false;
          this.students.refresh();
          this._snackBar.open('Added Successfully', 'Okay', {
            duration: 3000,
          });
        }).catch((err:any) => {
          this._snackBar.open('Something went wrong!', 'Okay', {
            duration: 3000,
          });
        })
      } else {
        this.srv.addStudent(this.Form.value).then((res) => {
          this.students.addRowFlag = false;
          this.students.refresh();
          this._snackBar.open('Added Successfully', 'Okay', {
            duration: 3000,
          });
        }).catch((err:any) => {
          this._snackBar.open('Something went wrong!', 'Okay', {
            duration: 3000,
          });
        })
      }
    } else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
    }
  }

}