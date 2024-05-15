import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NavItems } from '../../../ui/components/inner-nav.component';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ActionMenu } from './agComponents/action.component';
import { AgStatusComponent } from '../../../ui/components/agGridComponents/agStatus.component';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../core/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../../core/shared/widgets/popup/confirmation';
import { AddExportOrdersComponent } from './add-export-orders.component';

@Component({
  selector: 'app-export-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, AgGridModule, MatMenuModule,
    MatButtonModule,MatIconModule, MatCheckboxModule, AddExportOrdersComponent,
    FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NavItems],
  templateUrl: './export-orders.component.html',
  animations: [
    trigger('openCloseSearch', [
      state('true', style({ right: '0' })),
      state('false', style({ right: '-350px' })),
      transition('false <=> true', animate(250))
    ]),
    trigger('openCloseAdd', [
      state('true', style({ right: '0' })),
      state('false', style({ right: '-1080px' })),
      transition('false <=> true', animate(250))
    ]),

  ],
}) 
export class ExportOrdersComponent { 
  addRowFlag: boolean = false;
  searchFlag: boolean = false;
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.addRowFlag = false;
    this.searchFlag = false;
  }
  columnDefs: any;
  rowSelection: any;
  defaultColDef: any;
  isfilter: boolean = true;
  gridApi: any;
  gidColumnApi: any;
  getpaged: any = null;
  gridOptions: any;
  sidebarFlag: boolean = false;
  gridColumnApi: any;
  selectedColumns!: any[];
  orderTypeId = 2; // Export Order

  btnClick(fieldName:any, event:any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true );
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  constructor(private srv: OrdersService, public gl: GlobalVariable, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.columnDefs = [
      { 
        field: 'S_NO', headerName: ' S. NO.', width: 85,  
        sortingOrder: ["asc", "desc"],
        valueGetter: (params:any) => params.node.rowIndex + 1,
        pinned: 'left', sortable: false, filter: false, resizable: false, suppressMovable: true,
      },
      { field: 'action', headerName: 'Action',   cellRenderer: ActionMenu,  pinned: 'left',  width: 78, sortable: false, filter: false, resizable: false, suppressMovable: true },
      { 
        field: 'orderNumber', 
        headerName: 'Order Number', 
        width: 149
      },
      // { field: 'lastFreeDate', headerName: 'Last Free Date', width: 130},
      { 
        field: 'billToName', 
        headerName: 'Bill To', 
        width: 168
      },
      { 
        field: 'refNumber', 
        headerName: 'Ref Number', 
        width: 153, 
      },
      { 
        field: 'vgmDate', 
        headerName: 'Last Free Date', 
        width: 153, 
      },
      { 
        field: 'noOfContainers', 
        headerName: 'No Of Containers', 
        width: 153, 
      },
      { 
        field: 'legTypeName', 
        headerName: 'Leg Type', 
        width: 153, 
      },
      { 
        field: 'shippingLineName', 
        headerName: 'Shipping Line', 
        width: 153, 
      },
      { 
        field: 'vesselNo', 
        headerName: 'Vessel No', 
        width: 153, 
      },
      { 
        field: 'erdDate', 
        headerName: 'ERD Date', 
        width: 153, 
      },
      { 
        field: 'cargoDate', 
        headerName: 'Cargo Cutoff Date', 
        width: 153, 
      },
      { 
        field: 'documentDate', 
        headerName: 'DOC Date', 
        width: 153, 
      },
      { 
        field: 'isActive', 
        headerName: 'Status', 
        cellRenderer: AgStatusComponent,
        width: 105, 
        
      },
      { width: 70, sortable: false, filter: false, resizable: false, suppressMovable: true}
    ];

    this.rowSelection = "multiple";

    this.defaultColDef = {
      editable: false,
      resizable: true,
      filter: true,
    };

  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.getAllOrders();
  }
  
  getAllOrders() {
    let self = this;
    let data = {
      "currentPage": 1,
      "pageSize": 100,
      "filterText": "",
      "sortingColumnOrder": "",
      "statusId": 1,
    }
    self.srv.getAllOrders(this.orderTypeId, data).subscribe((m:any) => {
      if (m.success) {
        this.getpaged = m.lstModel;
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
    const selectedData: any = selectedNodes?.map((node:any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;
  }

  deleteRow(data:any) {
    if (data) {
      let obj = {'desc': 'You want to Delete "' + data.name + '"'}
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '350px',
        data: obj
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'OK') {
          const self = this;
          self.srv.deleteDriver(data.orderId).subscribe((m:any) => {
            if (m.success) {
              this._snackBar.open("Deleted Successfully", "Okay", { 'duration': 3000 });
              this.refresh()
            }
          });
        }
      });
    }
  }
}