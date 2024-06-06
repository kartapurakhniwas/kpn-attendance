import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalVariable } from '../../core/services/global.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AttandanceService } from '../../core/services/attandance/attandance.service';
import { StudentsService } from '../../core/services/students/students.service';



@Component({
  selector: 'app-attandance',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AgGridModule, MatMenuModule, MatExpansionModule,
    MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, RouterModule,
    MatTooltipModule, MatSlideToggleModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './attandance.component.html'
})
export class AttandanceTableComponent {
  detailFlag: boolean = true; // should be false
  columnDefs: any;
  rowSelection: any;
  defaultColDef: any;
  isfilter: boolean = true;
  gridApi: any;
  gidColumnApi: any;
  getpaged: any;
  gridOptions: any;
  sidebarFlag: boolean = false;
  gridColumnApi: any;
  countries: any;
  states: any;
  cities: any;
  rateZoneList: any;
  locationTypesList: any;
  allStudents: any;
  getAttandance: any = [];

  constructor(public gl: GlobalVariable,private _snackBar: MatSnackBar,
   private nav: Router, private srv: AttandanceService, private students:StudentsService) {
     
  
  }

  ngOnInit(): void {
    this.refresh();  
  }

  refresh() {
    this.getStudents();
    this.getAllAttandance();
  }

  getStudents() {
    this.students.getStudents().then((res:any) => {
      this.allStudents = res;
    }).catch((err:any) => {
      
    })
  }

  search() {
    if(this.Form.valid) {
      
    } else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      this._snackBar.open("Please select student!", "Okay", { 'duration': 3000 });
    }
  }

  Form = new FormGroup({
    created_at: new FormControl(new Date()),
    student_id: new FormControl(0),
    student_name: new FormControl(''),
    subject: new FormControl(0),
    subject_name: new FormControl(''),
    daily_attandance: new FormControl(false),
    coming_late: new FormControl(false),
    late_reason: new FormControl(''),
    on_leave: new FormControl(false),
    leave_reason: new FormControl(''),
    daily_homework: new FormControl(false),
    daily_homework_status: new FormControl(''),
    performance: new FormControl(false),
    performance_remarks: new FormControl(''),
  }) as any;

  setValue(data:any) {
    this.Form.controls["id"].setValue(data?.id);
    this.Form.controls["locationGuid"].setValue(data?.locationGuid);
    this.Form.controls["companyId"].setValue(data?.companyId);
    this.Form.controls["name"].setValue(data?.name);
    this.Form.controls["isActive"].setValue(data?.isActive);
    this.Form.controls["isDeleted"].setValue(data?.isDeleted);
    this.Form.controls["deletedBy"].setValue(data?.deletedBy);
    this.Form.controls["utcDeletedAt"].setValue(new Date());
    this.Form.controls["modifiedBy"].setValue(data?.modifiedBy);
    this.Form.controls["utcModifiedAt"].setValue(new Date());
    this.Form.controls["createdBy"].setValue(data?.createdBy);
    this.Form.controls["utcCreatedAt"].setValue(new Date());

  }
 
  save() {
    this.getAttandance.forEach((element:any, $index:any) => {
      this.srv.update(element, element.id).then((res) => {
        this._snackBar.open('Added Successfully', 'Okay', {
          duration: 3000,
        });
        if (($index + 1) == this.getAttandance.length) {
          this.getAllAttandance();
          this._snackBar.open('Saved Successfully', 'Okay', {
            duration: 3000,
          });
        }
      }).catch((err:any) => {
        this._snackBar.open('Something went wrong!', 'Okay', {
          duration: 3000,
        });
      })
    });
  }

  generate() {
    this.allStudents.forEach((element:any, $index: any) => {
        let data = this.Form.value;
        data.student_id = element.id;
        switch (element.subject) {
          case 2:
            data.subject_name = 'Frontend';
            break;
            case 3:
              data.subject_name = 'Backend';
              break;
              case 4:
                data.subject_name = 'Basics';
                break;
                case 5:
                  data.subject_name = 'Typing';
                  break;
        }
        data.student_name = element.student_name;
        this.srv.add(data).then((res) => {
          if (($index + 1) == this.allStudents.length) {
            this.getAllAttandance();
            this._snackBar.open('Added Successfully', 'Okay', {
              duration: 3000,
            });
          }
        }).catch((err:any) => {
          this._snackBar.open('Something went wrong!', 'Okay', {
            duration: 3000,
          });
        })
    });
  }

  getAllAttandance() {
    let date = new Date();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    this.srv.getAttandanceToday(startOfDay, endOfDay).then((res:any) => {
      this.getAttandance = res;
    }).catch((err:any) => {
      
    })
  }


}