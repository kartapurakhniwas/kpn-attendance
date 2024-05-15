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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { GlobalVariable } from '../../core/services/global.service';
import { LocationsService } from '../../core/services/locations/locations.service';
import { MasterCallService } from '../../core/services/master-services/master-services.service';
import { SearchLocations } from "./slides/search.component";
import { AgColumnFilterComponent } from "../../ui/components/agGridComponents/agColumnFilter.component";

@Component({
    selector: 'app-driver',
    standalone: true,
    templateUrl: './locations.component.html',
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
        MatNativeDateModule, RouterModule, MatButtonModule, SearchLocations, AgColumnFilterComponent,
        MatCheckboxModule
      ]
})
export class LocationsComponent {
  detailFlag: boolean = false;
  addRowFlag: boolean = false;
  searchFlag: boolean = false;
  backToYard: boolean = false;
  doneForDay: boolean = false;
  slideArray = [this.addRowFlag, this.searchFlag, this.backToYard, this.doneForDay];
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  locationTypesList: any;
  initialColumnDefs: any;
  valueGetters: any;
  cellRenderers: any;
  agParams: any;
  
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

  constructor(public gl: GlobalVariable, private _srv: LocationsService,
    private master: MasterCallService,
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
    this.getLocationTypes()
  }

  getLocationTypes() {
    let self = this;
      self.master.getLocationTypes().subscribe((m) => {
        if (m.success) {
          this.locationTypesList = m.lstModel;
          this.getLocations(this.locationTypeId);
        } 
      });
  }

  getLocations(locationType:number) {
    this._srv.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        this.getpaged = response.lstModel;
      },
      error: (err: any) => {

      }
    });
  }

  locationChange(event:any) {
    this.locationTypeId = event.value;
    this.getLocations(this.locationTypeId);
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