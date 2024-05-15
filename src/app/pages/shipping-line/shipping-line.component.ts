import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TotalValueRendererMenu } from './cellRenderer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { SearchShippingLine } from "./slides/search.component";
import { GlobalVariable } from '../../core/services/global.service';
import { isActiveComponent } from '../../ui/components/agGridComponents/isActive.component';
import { ShippingLineService } from '../../core/services/shipping-line/shipping-line.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  templateUrl: './shipping-line.component.html',
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
    MatNativeDateModule, RouterModule, SearchShippingLine]
})
export class ShippingLineComponent {
  detailFlag: boolean = false;
  addRowFlag: boolean = false;
  searchFlag: boolean = false;
  backToYard: boolean = false;
  doneForDay: boolean = false;
  slideArray = [this.addRowFlag, this.searchFlag, this.backToYard, this.doneForDay];
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.detailFlag = false;
    this.addRowFlag = false;
    this.searchFlag = false;
    this.backToYard = false;
    this.doneForDay = false;
  }
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

  btnClick(fieldName: any, event: any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true);
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  constructor(public gl: GlobalVariable, private _srv: ShippingLineService) {

    this.columnDefs = [
      {
        headerName: ' S. NO.', width: 85,  
        sortingOrder: ["asc", "desc"],
        pinned: 'left',
        valueGetter: (params:any) => params.node.rowIndex + 1,
        sortable: false, filter: false, resizable: false, suppressMovable: true
      },
      { field: 'action', headerName: 'Action', cellRenderer: TotalValueRendererMenu, pinned: 'left', width: 90, },
      { field: 'name', headerName: 'Shipping Line Name', width: 110,  },
      { 
        field: 'address', 
        headerName: 'Address', 
        width: 240, 
        valueGetter: (params:any) => {
          let a = params.data.shippingLineAddresses[0].address.streetLine1 +', '+ params.data.shippingLineAddresses[0].address.cityName +', '+ params.data.shippingLineAddresses[0].address.stateName +', '+ params.data.shippingLineAddresses[0].address.countryName +', '+ params.data.shippingLineAddresses[0].address.postalCode;
          return a;
        },
      },
      { 
        field: 'email', 
        headerName: 'Email', 
        width: 140, 
        valueGetter: (params:any) => params.data.shippingLineAddresses[0].address.contactPerson[0].emailMapping[0].email,
      },
      { 
        field: 'phone', 
        headerName: 'Phone', 
        width: 140, 
        valueGetter: (params:any) => params.data.shippingLineAddresses[0].address.contactPerson[0].phone,
      },
      { 
        field: 'fax', 
        headerName: 'fax', 
        width: 140, 
        valueGetter: (params:any) => params.data.shippingLineAddresses[0].address.contactPerson[0].fax,
      },
      { 
        field: 'url', 
        headerName: 'URL', 
        width: 140, 
      },
      { field: 'status', headerName: 'Status', cellRenderer: isActiveComponent, width: 122 },
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
    this._srv.getAllShippingLine(7).subscribe({
      next: (response: any) => {
        this.getpaged = response.lstModel;
      },
      error: (err: any) => {

      }
    });
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
    this.gridColumnApi = params.columnApi;
    // let dataValue = [{ "name": "John", "type": "supplier", "email": "kuljeetkhalsa13@gmail.com", "phone": 9915970299, "address": "2phase-Mohali", "contactperson": "Baljit Singh", "created": "10/05/2020" }, { "name": "John", "type": "supplier", "email": "kuljeetkhalsa13@gmail.com", "phone": 9915970299, "address": "2phase-Mohali", "contactperson": "Baljit Singh", "created": "10/05/2020" },]
    // params.api.setRowData(this.getpaged);
    params.api.setGridOption('rowData', this.getpaged);
  }

  onSelectionChanged() {
    this.gl.setRowData = null;
    const selectedNodes = this.agGrid?.api.getSelectedNodes();
    const selectedData: any = selectedNodes?.map((node: any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;

    if (this.gl.setRowData) {
      this.detailFlag = true
    }
  }

  blackOutFalse() {
    this.addRowFlag = false;
    this.searchFlag = false;
    this.backToYard = false;
    this.doneForDay = false;
  }

}