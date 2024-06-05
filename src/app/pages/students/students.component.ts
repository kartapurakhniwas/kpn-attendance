import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TotalValueRendererMenu } from './cellRenderer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { GlobalVariable } from '../../core/services/global.service';
import { AgColumnFilterComponent } from "../../ui/components/agGridComponents/agColumnFilter.component";
import { AddStudent } from "./slides/addStudent.component";
import { StudentsService } from '../../core/services/students/students.service';

@Component({
    selector: 'app-driver',
    standalone: true,
    templateUrl: './students.component.html',
    animations: [
        trigger('openCloseSearch', [
            state('true', style({ right: '0' })),
            state('false', style({ right: '-350px' })),
            transition('false <=> true', animate(250))
        ]),
        trigger('openCloseAdd', [
            state('true', style({ right: '0' })),
            state('false', style({ right: '-850px' })),
            transition('false <=> true', animate(250))
        ]),
    ],
    imports: [FormsModule, CommonModule, AgGridModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatCheckboxModule,
        FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule, RouterModule, MatButtonModule, AgColumnFilterComponent,
        MatCheckboxModule, AddStudent]
})
export class StudentsComponent {
  
  addRowFlag: boolean = false;
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  locationTypesList: any;
  initialColumnDefs: any;
  valueGetters: any;
  cellRenderers: any;
  agParams: any;
  
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.addRowFlag = false;
  }
  columnDefs: any;
  rowSelection: any;
  defaultColDef: any;
  isfilter: boolean = true;
  gridApi: any;
  gidColumnApi: any;
  getpaged: any = [];
  gridOptions: any;
  sidebarFlag: boolean = false;
  gridColumnApi: any;
  locationTypeId:number = 1;

  btnClick(fieldName: any, event: any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true);
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  constructor(public gl: GlobalVariable, 
    public srv: StudentsService
  ) {

    this.valueGetters = {
      snoValueGetter: (params:any) => params.node.rowIndex + 1,
      addressValueGetter: (params:any) => params.data.addressMappings[0].address.addressTitle,
      cityNameValueGetter: (params:any) => params.data.addressMappings[0].address.cityName,
      stateNameValueGetter: (params:any) => params.data.addressMappings[0].address.stateName,
      countryNameValueGetter: (params:any) => params.data.addressMappings[0].address.countryName,
      locationTypeNameValueGetter: (params:any) => params.data.locationTypes[0].locationTypeName,
  };

  this.cellRenderers = {
    actionCellRendrer: TotalValueRendererMenu
  }

    this.columnDefs = [

      {
        field: 'S_NO', headerName: ' S. NO.', width: 85, 
        headerCheckboxSelection: true,
        checkboxSelection: true,
        sortingOrder: ["asc", "desc"],
        pinned: 'left',
        valueGetterIdentifier: 'snoValueGetter',
      },
      { 
        field: 'action', 
        headerName: 'Action', 
        cellRendererIdentifier: 'actionCellRendrer', 
        suppressClickEdit: true,
        cellRendererParams: {
          allowMultipleHits: false,
      },
        pinned: 'left', 
        width: 90
      },
      { field: 'name', headerName: 'Location Name', width: 110, },
      { 
        field: 'address', 
        headerName: 'Address', 
        width: 140,
        valueGetterIdentifier: 'addressValueGetter',
      },
      { 
        field: 'city', 
        headerName: 'City', 
        width: 140, 
        valueGetterIdentifier: 'cityNameValueGetter',
      },
      { 
        field: 'state', 
        headerName: 'State', 
        width: 140, 
        valueGetterIdentifier: 'stateNameValueGetter',
      },
      { 
        field: 'countryName', 
        headerName: 'Country Name', 
        width: 140, 
        valueGetterIdentifier: 'countryNameValueGetter',
      },
      { 
        field: 'status', 
        headerName: 'Status', 
        valueGetterIdentifier: 'locationTypeNameValueGetter',
        width: 122 
      },
    ];
    this.rowSelection = "multiple";

    this.defaultColDef = {
      editable: false,
      resizable: true,
      filter: true,
    };
    this.gl.setRowData = null;

  }

  ngOnInit(): void {
    this.refresh() ;
  }
  selectedColumns!: any[];

  refresh() {
    
  }

  // AG GRID


  onFilterChanged() {
    let temp = this.gridApi.getFilterModel();

    if (Object.keys(this.gridApi.getFilterModel()).length > 0) {
      this.isfilter = true;
    }
    else {
      this.isfilter = false
    }
  }

  onGridReady(params: any) {
    this.gridOptions = params;
    this.gridApi = params.api;
    this.agParams = params;
    this.gridColumnApi = params.columnApi;

    params.api.setGridOption('rowData', this.getpaged);

    // to save column defs
    this.initialColumnDefs = this.gridApi.getColumnDefs();
    let a:any = localStorage.getItem('locationGridColOrder');
    if (a == null || undefined) {
      localStorage.setItem('locationGridColOrder', JSON.stringify(this.initialColumnDefs ));
    }
    this.gl.setColmDefs(this.gridApi, 'locationGridColOrder', this.valueGetters, this.cellRenderers);
  }

  onSelectionChanged() {
    this.gl.setRowData = null;
    const selectedNodes = this.agGrid?.api.getSelectedNodes();
    const selectedData: any = selectedNodes?.map((node: any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;

  }

  blackOutFalse() {
    this.addRowFlag = false;
  }

  save() {
    let data = {
      created_at: new Date(),
      student_name: 'test first',
      address: 'lorem',
      phone: '324534256',
      subject: 2
    }
    this.srv.addStudent(data).then((res) => {
      console.log(res);
      
    }).catch((err:any) => {
      console.log(err);
      
    })
  }

}