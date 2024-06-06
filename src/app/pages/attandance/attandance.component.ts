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
export class AttandanceComponent {
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

  constructor(public gl: GlobalVariable,private _snackBar: MatSnackBar,
   private nav: Router, private srv: AttandanceService, private students:StudentsService) {
     
  
  }

  ngOnInit(): void {
    this.refresh();  
    // if (this.gl.setRowData) {
    //   this.countryChange({value: this.gl.setRowData.addressMappings[0].address.countryId});
    // }
    
  }

  refresh() {
    this.getStudents();
  }

    getStudents() {
      this.students.getStudents().then((res:any) => {
        this.allStudents = res;
      }).catch((err:any) => {
        
      })
    }

  // getById(data:any) {
  //   let self = this;
  //   self.srv.getLocationById(data.id).subscribe((m:any) => {
  //     if (m.success) {
  //       this.setValue(m.model);
  //     }
  //   });
  // }

  search() {

  }

  Form = new FormGroup({
    created_at: new FormControl(new Date()),
    student_id: new FormControl(0),
    subject: new FormControl(0),
    daily_attandance: new FormControl(false),
    coming_late: new FormControl(false),
    late_reason: new FormControl(''),
    on_leave: new FormControl(false),
    leave_reason: new FormControl(''),
    daily_homework: new FormControl(false),
    daily_homework_status: new FormControl(''),
    performance: new FormControl(false),
    performance_remarks: new FormControl('')
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
    let data = JSON.parse(JSON.stringify(this.Form.value));
    if (this.Form.valid) {
      let self = this;
      // if(this.gl.setRowData) {
      //   self.srv.UpdateLocation(data).subscribe((m:any) => {
      //     if (m.success) {
      //       this.nav.navigateByUrl('/locations');
      //       this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
      //     } else {
      //       this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      //     }
      //   });
      // } else {
      //   self.srv.AddLocation(data).subscribe((m:any) => {
      //     if (m.success) {
      //       this.nav.navigateByUrl('/locations');
      //       this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
      //     } else {
      //       this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      //     }
      //   });
      // }
    }  else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
    }
  }


}