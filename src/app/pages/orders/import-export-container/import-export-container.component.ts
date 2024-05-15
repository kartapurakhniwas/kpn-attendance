import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatRadioModule } from '@angular/material/radio';
import { NavItems } from '../../../ui/components/inner-nav.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerTrack } from '../../../core/services/container-track/ContainerTrack.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MasterCallService } from '../../../core/services/master-services/master-services.service';
import { LocationsService } from '../../../core/services/locations/locations.service';
import { GlobalVariable } from '../../../core/services/global.service';
import { FleetAPIService } from '../../../core/services/fleetAPI/fleet-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IfStmt } from '@angular/compiler';
import { InputPopupComponent } from '../../../core/shared/widgets/input-popup/input-popup';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../core/shared/widgets/popup/confirmation';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { ContainerRedirect } from './containerRedirect.component';
import { ContinerTypeDropdownComponent } from './ag-container-type-col-dropdown/ag-container-type-col-dropdown.component';
import { Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { PortStatusTypeDropdownComponent } from './ag-container-type-col-dropdown/ag-port-status-type-col-dropdown.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LocationTabComponent } from "../../../ui/components/order-detail-components/location-tab/locaiton-tab.component";
import { HistoryTabComponent } from "../../../ui/components/order-detail-components/history-tab/history-tab.component";
import { AssignTabFormComponent } from "../../../ui/components/order-detail-components/assign-tab-form/assign-tab-form.component";
import { PlannerComponent } from "../../../ui/components/order-detail-components/planner/planner.component";
import { UploadDocTabComponent } from "../../../ui/components/order-detail-components/upload-doc-tab/upload-doc-tab.component";
import { ExcelUploadPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-upload-popup';
import { ExcelDataPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-data-popup';
import { each } from 'chart.js/dist/helpers/helpers.core';
import {Title} from "@angular/platform-browser";
import { ContainerCellRender } from './containerNoCellrender.component';

@Component({
  selector: 'app-import-export-container',
  standalone: true,
  imports: [FormsModule, CommonModule, AgGridModule, MatMenuModule,
    MatButtonModule, MatIconModule, MatCheckboxModule,
    FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NavItems,
    MatRadioModule, MatDatepickerModule, ReactiveFormsModule, MatTabsModule, LocationTabComponent
    , HistoryTabComponent, AssignTabFormComponent, PlannerComponent, UploadDocTabComponent, MatDialogModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './import-export-container.component.html',
  animations: [
    trigger('openCloseSearch', [
      state('true', style({ right: '0' })),
      state('false', style({ right: '-600px' })),
      transition('false <=> true', animate(250))
    ]),
    trigger('openCloseAdd', [
      state('true', style({ right: '0' })),
      state('false', style({ right: '-850px' })),
      transition('false <=> true', animate(250))
    ]),

  ],
})
export class ImportExportContainerComponent {
  addRowFlag: boolean = false;
  searchFlag: boolean = false;
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  loaderFlag: boolean = false;
  initialColumnDefs: any;
  valueGetters: any;
  cellRenderers: any;
  currentGridSetting: any;
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
  getpaged: any;
  gridOptions: any;


  sidebarFlag: boolean = false;
  gridColumnApi: any;
  date: any = new Date();
  containerStatusList: any;
  portStatusList: any;
  locationsList: any;
  isDateDisable: boolean = false;
  isSelectDateDisable: boolean = true;
  driverList: any;
  truckList: any;
  trailerList: any;
  SearchType: number = 5
  filterId: any;
  filterName: any;
  filterlst: any;
  billToLst: any;
  Tradetype: any = 0;
  detailFlag: boolean = false;
  orderId: any;
  containerType: any;
  selectedFilterId: any;
  filterModel:any="";
  callfromFilter:any=false;

  searchButtonslst: any = [{ 'id': 4, 'ClickValue': 4, 'name': 'LFD', 'count': 12, 'title': 'This will filter the Import records by pickup last free date for Today Onwards Sorted By PU LFD', 'bgStyle': '' }
    , { 'id': 7, 'ClickValue': 7, 'name': 'EM-Re', 'count': 15, 'title': 'This will filter the Import records by Pickup empty return LFD date for Today Onwards Sorted By Empty Return LFD/DP LFD', 'bgStyle': '' }
    , { 'id': 5, 'ClickValue': 5, 'name': 'IM UP-JOB', 'count': 14, 'title': 'This will filter the all the Import jobs which have missed dates (PU Resev,DP Reserv,Empty return LFD/DP LFD) Sorted by PU Reservation Date (Desc)', 'bgStyle': '' }
    , { 'id': 6, 'ClickValue': 6, 'name': 'ERD/ Cut-Off', 'count': 74, 'title': 'This will filter the Export records by Cut-off date for Today Onwards Sorted By ERD/DP Date', 'bgStyle': '' }
    , { 'id': 8, 'ClickValue': 8, 'name': 'EX UP-JOB', 'count': 8, 'title': 'This will filter the all Export jobs which have missed dates (PU Resev,DP Reserv,DP ERD/DP date,Cut off date/DP LFD) Sorted by Export ERD', 'bgStyle': '' }
    , { 'id': 9, 'ClickValue': 9, 'name': 'CONT-Ya', 'count': 9, 'title': 'This will filter the all records by container left at Yard Sorted By PU Reservation Date', 'bgStyle': '' }
    , { 'id': 10, 'ClickValue': 10, 'name': 'CONT-Cu', 'count': 10, 'title': 'This will filter the all records by container left at loading / unloading location Sorted By PU Reservation Date', 'bgStyle': '' }

  ]



  btnClick(fieldName: any, event: any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true);
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  searchForm = new FormGroup({
    companyId: new FormControl(0),
    type: new FormControl('0'),
    statusIds: new FormControl(''),
    loadStatusTypeIds: new FormControl(''),
    keyword: new FormControl(''),
    pageNo: new FormControl(1),
    pageSize: new FormControl(50),
    fromDate: new FormControl(this.gl.getPreviousWeekDate(this.date)),
    toDate: new FormControl(this.date),
    billToId: new FormControl(0),
    portStatusId: new FormControl(0),
    searchFromDate: new FormControl(),
    searchToDate: new FormControl(),
    searchDateType: new FormControl(0),
    isLoadingDate: new FormControl(false),
    isEmptyReturnDate: new FormControl(false),
    isVesselArrivalDate: new FormControl(false),
    isPickupdate: new FormControl(false),
    isPickupReservationDate: new FormControl(false),
    isDropReservationDate: new FormControl(false),
    isEarlyReturnDate: new FormControl(false),
    isDropupLastFreeDate: new FormControl(false),
    isPickupLastFreeDate: new FormControl(false),
    fleetSearch: new FormControl(0),
    selectSearchTypeIds: new FormControl(''),
    sortingColName: new FormControl(''),
    sortingColOrder: new FormControl('1'),
    sortingColName2: new FormControl(''),
    sortingColOrder2: new FormControl('1'),
    sortingColName3: new FormControl(''),
    sortingColOrder3: new FormControl('1'),
  }) as any;


  filterForm = new FormGroup({
    filterId: new FormControl(0),
    filterPageId: new FormControl(0),
    saveFilterTitle: new FormControl(''),
    saveFilterJson: new FormControl(''),
    companyId: new FormControl(0),
    userId: new FormControl(0),
    isDeleted: new FormControl(false),

  }) as any;

  containerUpdateForm = new FormGroup({
    type: new FormControl(""),
    data: new FormControl(0),
    containerGuids: new FormControl(''),


  }) as any;
  constructor(private _srvContainerTrack: ContainerTrack, private _srvMasterCall: MasterCallService,
    private _srvLocationsService: LocationsService, public gl: GlobalVariable,
    private _srvFleetAPIService: FleetAPIService, private _snackBar: MatSnackBar
    , private dialog: MatDialog, private _srvCustomerService: CustomerService,
    private router: Router, private route: ActivatedRoute, private title:Title) {

      this.valueGetters = {
        snoValueGetter: (params:any) => params.node.rowIndex + 1,
        orderTypeValueGetter: (params: any) => params.data.orderTypeId == 1 ? 'Import Only' : 'Export Only',
    };
  
    this.cellRenderers = {
      actionCellRendrer: TotalValueRendererMenu,
      containerCellRendrer: ContainerCellRender,
      containerTypeCellRendrer: ContinerTypeDropdownComponent,
      portStatusCellRendrer: PortStatusTypeDropdownComponent,
      containerRedirectRendrer: ContainerRedirect,
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
        pinned: 'left', 
        width: 110, 
      },
      { field: 'orderNumber', headerName: 'ORDER NO', width: 110, editable: false, pinned: 'left', 
      cellRendererIdentifier: 'containerRedirectRendrer', 
       },
      {
        field: 'orderTypeId', headerName: 'Order Type', width: 100, editable: false, pinned: 'left',
        valueGetterIdentifier: 'orderTypeValueGetter',
      },
      { field: 'ordCreatedDate', headerName: 'Order DATE', width: 120, editable: false },
      { field: 'grossWeight', headerName: 'GR WT', width: 100, editable: true },
      { field: 'tareWeight', headerName: 'TR WT', width: 100, editable: true },
      { field: 'pickUpTVAId', headerName: 'PU TVA', width: 100, editable: true },
      { field: 'dropOffTVAId', headerName: 'DP TVA', width: 100, editable: false },
      { field: 'vesselDate', headerName: 'VESSEL/PORT', width: 110, editable: false },
      { field: 'containerNo', headerName: 'CONTAINER NO', width: 110, editable: true, 
        cellRendererIdentifier: 'containerCellRendrer', 
      },
      {
        field: 'containerTypeId',
        headerName: 'CONTAINER TYPE',
        width: 140,
        editable: false,
        cellRendererIdentifier: 'containerTypeCellRendrer', 
        // cellRendererParams: (params: any) => {
        //   let iterationObject = { 'params': params.data,'containerTypeList':this.containerType};
          
        //   return { iterationObject };
        // }
      },
      {
        field: 'portStatusId',
        headerName: 'PORT STATUS',
        width: 140,
        cellRendererIdentifier: 'portStatusCellRendrer', 
        // cellRendererParams: (params: any) => {
        //   const iterationObject = { 'parms': params.data, 'portStatusList': this.portStatusList };
        //   return { iterationObject };
        // },
      },
      { field: 'vesselDate', headerName: 'Order DATE', width: 120, editable: false },
      { field: 'billToName', headerName: 'Bill TO', width: 100, editable: false },
      { field: 'vesselNo', headerName: 'Vessel No', width: 110, editable: false },
      { field: 'spotLane', headerName: 'SPOTLANE', width: 110, editable: true },
      { field: 'ordCreatedDate', headerName: 'DP DATE', width: 120, editable: false },
      { field: 'puLastFreeDate', headerName: 'PU LFD', width: 120, editable: false },
      { field: 'dpLastFreeDate', headerName: 'DP LFD', width: 120, editable: false },
      { field: 'refNumber', headerName: 'B/L NO', width: 120, editable: false },
      { field: 'orderNotes', headerName: 'CONTAINER NOTES', width: 140, editable: false },
      { field: 'statusName', headerName: 'status', width: 120, editable: false },
      { field: 'dpLastFreeDate', headerName: 'DROP AT', width: 110, editable: false },
      { field: 'driverName', headerName: 'DRIVER', width: 140, editable: false },
      { field: 'truckNumber', headerName: 'TRUCK', width: 140, editable: false },
      { field: 'trailerNumber', headerName: 'CHASSIS', width: 140, editable: false },
      { field: 'loadStatusName', headerName: 'LOAD TYPE', width: 140, editable: false },
      { field: 'containerType', headerName: 'TYPE', width: 140, editable: false },
      { field: 'size', headerName: 'SIZE', width: 140, editable: false },
      { field: 'dropOffReservationFromDateTime', headerName: 'DP TIME', width: 140, editable: false },
      { field: 'shippingLineName', headerName: 'SHIP LINE', width: 140, editable: false },
      { field: 'puDate', headerName: 'PU DATE', width: 140, editable: false },
      { field: 'pickUpReservationNo', headerName: 'PU RES No', width: 140, editable: false },
      { field: 'dpResDate', headerName: 'DP RES DATE', width: 140, editable: false },
      { field: 'puResDate', headerName: 'PU RES DATE', width: 140, editable: false },
      { field: 'dropOffReservationNo', headerName: 'DP RES NO', width: 140, editable: false },
      { field: 'puResStTime', headerName: 'PU TIME', width: 140, editable: false },

    ];
    this.rowSelection = "single";

    this.defaultColDef = {
      editable: false,
      resizable: true,
      filter: true,
    };






  }

  ngOnInit(): void {


    this.GetContainerStatus(0);
    this.getAllFilters();
    this.GetContainerCount();
    // this.GetContainerType();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedFilterId = params.get('id');

      if (this.selectedFilterId > 0) {


        this._srvContainerTrack.GetAllSearchFilters(0).subscribe((m: any) => {
          if (m.success) {
            this.filterlst = m.lstModel;
            let selecteddata = this.filterlst.filter((x: any) => x.filterId == this.selectedFilterId);
            this.filterName = selecteddata[0].saveFilterTitle;
            let jsonParedData = JSON.parse(selecteddata[0].saveFilterJson);
            console.log(jsonParedData, 'jsonParedData');
            this.setSearchForm(jsonParedData);
           this.filterModel=this.selectedFilterId;
           this.filterId=this.selectedFilterId;
           this.title.setTitle(this.filterName);
           this.callfromFilter=true;
           this.getGridData(this.searchForm.value);
         //  console.log('filter')

          }
        });

       
      }else{
        this.getGridData(this.searchForm.value);
        console.log('main')
      }

    });
   
    
  }
  selectedColumns!: any[];


  // GetContainerType(){
  //   let self = this;
  //     if (m.success) {
  //       this.containerType = m.lstModel;
  //      // this.typeSelected = this.value.containerTypeId;
  //     } 
  //   });
  // }
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

    this.initialColumnDefs = this.gridApi.getColumnDefs();
    let a:any = localStorage.getItem('TrackGridColOrder');
    if (a == null || undefined) {
      localStorage.setItem('TrackGridColOrder', JSON.stringify(this.initialColumnDefs ));
    }
    this.gl.setColmDefs(this.gridApi, 'TrackGridColOrder', this.valueGetters, this.cellRenderers);
  }

  onSelectionChanged() {
    this.gl.setRowData = null;
    const selectedNodes = this.agGrid?.api.getSelectedNodes();
    const selectedData: any = selectedNodes?.map((node: any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;

    if (this.gl.setRowData) {
      console.log("🚀 ~ ImportOrdersDetailComponent ~ onSelectionChanged ~ this.gl.setRowData:", this.gl.setRowData)
      this.detailFlag = true;

    }
  }

  onCellValueChanged(data: any) {
    let payload = data.data;
    let self = this;
    let formData = self.containerUpdateForm.value;
    // console.log(data, "Cell data");
    // console.log(payload, "onCellValueChanged");
    if (data.column.colId == "containerNo") {
      formData.type = "1";
      formData.data = payload.containerNo;
      formData.containerGuids = payload.containerGuid;

    }
    if (data.column.colId == "grossWeight") {
      formData.type = "4";
      formData.data = JSON.stringify(payload.grossWeight);
      formData.containerGuids = payload.containerGuid;

    }
    if (data.column.colId == "spotLane") {
      formData.type = "5";
      formData.data = payload.spotLane;
      formData.containerGuids = payload.containerGuid;

    }
    if (data.column.colId == "tareWeight") {
      formData.type = "3";
      formData.data = JSON.stringify(payload.tareWeight);
      formData.containerGuids = payload.containerGuid;

    }

    this._srvContainerTrack.UpdateContainerInfo(formData).subscribe((m: any) => {
      if (m.success) {

        this._snackBar.open("Value Updated Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
    //console.log(formData, "formData");


  }

  getGridData(formData: any) {

  //console.log(Array.isArray(formData.statusIds),'isArray');


    if (Array.isArray(formData.statusIds) && formData.statusIds.length>0) {
      formData.statusIds = formData.statusIds.join();
    }
    if (Array.isArray(formData.loadStatusTypeIds) && formData.loadStatusTypeIds.length>0) {
      formData.loadStatusTypeIds = formData.loadStatusTypeIds.join();
    }
    if (Array.isArray(formData.selectSearchTypeIds) &&  formData.selectSearchTypeIds.length>0) {
      formData.selectSearchTypeIds = formData.selectSearchTypeIds.join();
    }
    this._srvContainerTrack.Search(formData).subscribe({
      next: (response: any) => {
        this.getpaged = response.lstModel;
        this.loaderFlag = false;
        this.GetGridSettings();
      },
      error: (err: any) => {

      }
    });
  }

  GetGridSettings() {
    let self = this;
    self._srvContainerTrack.GetTrackGrid(this.Tradetype).subscribe((m: any) => {
      if (m.success) {
        if(m.model) {
          console.log(m.model);
          this.currentGridSetting = m.model;
          localStorage.setItem('TrackGridColOrder', JSON.stringify([m.model.jsonData]));
        }

      }
    });
  }

  GetContainerStatus(orderTypeId: any) {
    let self = this;
    self._srvMasterCall.GetContainerStatus(orderTypeId).subscribe((m: any) => {
      if (m.success) {
        this.containerStatusList = m.lstModel;
        this.getLocations()
      }
    });
  }

  // GetPortStatus() {
  //   let self = this;
  //   self._srvMasterCall.GetPortStatus().subscribe((m: any) => {
  //     if (m.success) {
  //       this.portStatusList = m.lstModel;
  //       this.getLocations();
  //     }
  //   });
  // }

  getLocations() {
    this._srvLocationsService.getPickDropLocations().subscribe({
      next: (response: any) => {
        this.locationsList = response.lstModel;

      },
      error: (err: any) => {

      }
    });
  }

  searchClick() {
    this.loaderFlag = true;
    let data = this.searchForm.value;
    console.log(data, 'searchClick');

    data.keyword = String(data.keyword);


    this.getGridData(data);
    this.searchFlag = false;
  }

  onKeywordchange(val: any) {
    this.loaderFlag = true;
    let data = this.searchForm.value;
    data.keyword = val.target.value;
    if (data.statusIds != "") {
      data.statusIds = data.statusIds.join();
    }
    if (data.loadStatusTypeIds != "") {
      data.loadStatusTypeIds = data.loadStatusTypeIds.join();
    }

    this.getGridData(this.searchForm.value);
    this.searchFlag = false;
  }

  onDataTypechange(e: any) {
    let items = e.value;
    this.searchForm.controls["selectSearchTypeIds"].setValue(e.value);
    this.searchForm.controls["searchDateType"].setValue(0);
    this.searchForm.controls["isLoadingDate"].setValue(false);
    this.searchForm.controls["isEmptyReturnDate"].setValue(false);
    this.searchForm.controls["isVesselArrivalDate"].setValue(false);
    this.searchForm.controls["isPickupReservationDate"].setValue(false);
    this.searchForm.controls["isDropReservationDate"].setValue(false);
    this.searchForm.controls["isEarlyReturnDate"].setValue(false);
    this.searchForm.controls["isDropupLastFreeDate"].setValue(false);
    this.searchForm.controls["isPickupLastFreeDate"].setValue(false);
    this.searchForm.controls["isPickupdate"].setValue(false);
    if (items.length > 0) {
      this.searchForm.controls["fromDate"].setValue(null);
      this.searchForm.controls["toDate"].setValue(null);
      this.searchForm.controls["searchFromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["searchToDate"].setValue(this.date);
      this.isDateDisable = true;

    }
    else {
      this.searchForm.controls["fromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["toDate"].setValue(this.date);
      this.searchForm.controls["searchFromDate"].setValue(null);
      this.searchForm.controls["searchToDate"].setValue(null);
      this.isDateDisable = false;

    }

    items.forEach((element: number) => {

      this.searchForm.controls["searchDateType"].setValue(1);
      if (element == 1) {
        this.searchForm.controls["isLoadingDate"].setValue(true);

        console.log(this.searchForm.value, 'searchForm')
      }
      else if (element == 2) {
        this.searchForm.controls["isVesselArrivalDate"].setValue(true);
      }
      else if (element == 3) {
        this.searchForm.controls["isPickupdate"].setValue(true);
      }
      else if (element == 4) {
        this.searchForm.controls["isPickupLastFreeDate"].setValue(true);
      }
      else if (element == 5) {
        this.searchForm.controls["isPickupReservationDate"].setValue(true);
      }
      else if (element == 6) {
        this.searchForm.controls["isEarlyReturnDate"].setValue(true);
      }
      else if (element == 7) {
        this.searchForm.controls["isEmptyReturnDate"].setValue(true);
      }
      else if (element == 8) {
        this.searchForm.controls["isDropReservationDate"].setValue(true);
      }
    });
    // console.log(this.searchForm.value);


  }

  ontypechange(val: any) {
    //console.log(val.target.value);
    let data = this.searchForm.value;
    data.type = val.target.value;
    this.searchForm.controls["type"].setValue(val.target.value);
    this.GetContainerStatus(val.target.value);
    if (data.statusIds != "") {
      data.statusIds = data.statusIds.join();
    }
    if (data.loadStatusTypeIds != "") {
      data.loadStatusTypeIds = data.loadStatusTypeIds.join();
    }

    this.getGridData(this.searchForm.value);
    this.searchFlag = false;

  }

  getDriver() {
    let self = this;
    self._srvFleetAPIService.getAllDrivers().subscribe((m: any) => {
      if (m.respStatus) {
        this.driverList = m.lstModel;

      }
    });
  }

  getTrucks() {
    let self = this;
    self._srvFleetAPIService.getAllTruck().subscribe((m: any) => {
      if (m.respStatus) {
        console.log("🚀 ~ ImportOrdersDetailComponent ~ self.fleetApi.getAllTruck ~ m:", m)
        this.truckList = m.lstModel;

      }
    });
  }

  getTrailer() {
    let self = this;
    self._srvFleetAPIService.getAllTrailer().subscribe((m: any) => {
      if (m.respStatus) {
        this.trailerList = m.lstModel;

      }
    });
  }

  getBillTo() {
    let self = this;
    self._srvCustomerService.getAllCustomers(0).subscribe((m: any) => {
      if (m.success) {
        this.billToLst = m.lstModel;

      }
    });
  }

  changeSearchType(val: number) {
    this.SearchType = val;
    this.searchForm.controls["keyword"].setValue("");
    if (val == 0) {
      this.SearchType = 5;


    }

    if (val == 1) {
      this.getDriver();
    }
    else if (val == 2) {
      this.getTrucks();
    }
    else if (val == 3) {
      this.getTrailer();
    }
    else if (val == 4) {
      this.getBillTo();
    }
  }

  AddFilter() {
    let obj = { 'Title': 'Add filter' }
    const dialogRef = this.dialog.open(InputPopupComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.SaveFilter(result);
    });
  }

  SaveFilter(title: any) {
    let data = this.filterForm.value;
    data.saveFilterTitle = title;
    data.saveFilterJson = JSON.stringify(this.searchForm.value);
    this._srvContainerTrack.AddFilter(data).subscribe((m: any) => {
      if (m.success) {
        this.getAllFilters();
        this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }




  getAllFilters() {

    let self = this;
    self._srvContainerTrack.GetAllSearchFilters(0).subscribe((m: any) => {
      if (m.success) {
        this.filterlst = m.lstModel;

      }
    });
  }

  changefilter(e: any) {
    this.filterId = e.target.value;
    // let selecteddata = this.filterlst.filter((x: any) => x.filterId == this.filterId);
    // this.filterName = selecteddata[0].saveFilterTitle;
    // let jsonParedData = JSON.parse(selecteddata[0].saveFilterJson);
    // console.log(jsonParedData, 'jsonParedData');
    // this.setSearchForm(jsonParedData);
    window.open('/import-export-container/filter/'+this.filterId, "_blank");
  }

  OpenUpdateFilter() {
    let obj = { Title: 'Update filter', inputName: this.filterName }
    const dialogRef = this.dialog.open(InputPopupComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.UpdateFilter(result);
    });
  }

  UpdateFilter(title: any) {
    let data = this.filterForm.value;
    data.saveFilterTitle = title;
    data.filterId = this.filterId;
    data.saveFilterJson = JSON.stringify(this.searchForm.value);
    this._srvContainerTrack.UpdadeFilter(data).subscribe((m: any) => {
      if (m.success) {
        this.getAllFilters();
        this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }


  deleteFilter() {


    let obj = { 'Desc': 'You want to Delete ' + this.filterName + '?' }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'OK') {
        this._srvContainerTrack.Delete(this.filterId).subscribe((m: any) => {
          if (m.success) {
            this.getAllFilters();
            this.searchFlag = false;
            this._snackBar.open("Deleted Successfully!", "Okay", { 'duration': 3000 });
          } else {
            this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
          }
        });

      }
    });
  }

  setSearchForm(model: any) {
    this.GetContainerStatus(model?.type);
    this.searchForm.controls["searchDateType"].setValue(model?.searchDateType);
    this.searchForm.controls["isLoadingDate"].setValue(model?.isLoadingDate);
    this.searchForm.controls["isEmptyReturnDate"].setValue(model?.isEmptyReturnDate);
    this.searchForm.controls["isVesselArrivalDate"].setValue(model?.isVesselArrivalDate);
    this.searchForm.controls["isPickupReservationDate"].setValue(model?.isPickupReservationDate);
    this.searchForm.controls["isDropReservationDate"].setValue(model?.isDropReservationDate);
    this.searchForm.controls["isEarlyReturnDate"].setValue(model?.isEarlyReturnDate);
    this.searchForm.controls["isDropupLastFreeDate"].setValue(model?.isDropupLastFreeDate);
    this.searchForm.controls["isPickupLastFreeDate"].setValue(model?.isPickupLastFreeDate);
    this.searchForm.controls["isPickupdate"].setValue(model?.isPickupdate);

    this.searchForm.controls["statusIds"].setValue(model?.statusIds);
    this.searchForm.controls["type"].setValue(model?.type);
    this.searchForm.controls["loadStatusTypeIds"].setValue(model?.loadStatusTypeIds);
    this.searchForm.controls["keyword"].setValue(model?.keyword);
    this.searchForm.controls["pageSize"].setValue(model?.pageSize);

    this.searchForm.controls["portStatusId"].setValue(model?.portStatusId);


    this.searchForm.controls["fleetSearch"].setValue(model?.fleetSearch);
    this.searchForm.controls["selectSearchTypeIds"].setValue(model?.selectSearchTypeIds);

    this.searchForm.controls["sortingColName"].setValue(model?.sortingColName);
    this.searchForm.controls["sortingColName2"].setValue(model?.sortingColName2);
    this.searchForm.controls["sortingColName3"].setValue(model?.sortingColName3);
    this.searchForm.controls["sortingColOrder"].setValue(model?.sortingColOrder);
    this.searchForm.controls["sortingColOrder2"].setValue(model?.sortingColOrder2);
    this.searchForm.controls["sortingColOrder3"].setValue(model?.sortingColOrder3);
    

    if (model?.searchDateType == 0) {
      this.searchForm.controls["fromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["toDate"].setValue(this.date);
      this.searchForm.controls["searchFromDate"].setValue(null);
      this.searchForm.controls["searchToDate"].setValue(null);
      this.isDateDisable = false;

    }
    else {
      this.searchForm.controls["fromDate"].setValue(null);
      this.searchForm.controls["toDate"].setValue(null);
      this.searchForm.controls["searchFromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["searchToDate"].setValue(this.date);
      this.isDateDisable = true;

    }

    if (model.fleetSearch == 0) {
      this.SearchType = 5;
    }
    else if (model.fleetSearch == 1) {
      this.getDriver();
    }
    else if (model.fleetSearch == 2) {
      this.getTrucks();
    }
    else if (model.fleetSearch == 3) {
      this.getTrailer();
    }
    else if (model.fleetSearch == 4) {
      this.getBillTo();
    }
    else {
      this.SearchType = model.fleetSearch;
    }


  }


  SetDateType(val: any) {
   //  console.log(val,'click button'+val);
    this.loaderFlag = true;

    this.searchButtonslst.forEach((element: any) => {
      if (element.id == val) {
        element.bgStyle = "c-button-bg";
      }
      else {
        element.bgStyle = "";
      }
    });

    this.Tradetype = 0;
    this.searchForm.controls["searchDateType"].setValue(1);
    this.searchForm.controls["selectSearchTypeIds"].setValue("");
    this.searchForm.controls["statusIds"].setValue("");
    let data = null;
    let statusval = null;

    this.searchForm.controls["fromDate"].setValue(null);
    this.searchForm.controls["toDate"].setValue(null);
    this.searchForm.controls["searchFromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
    this.searchForm.controls["searchToDate"].setValue(this.date);
    this.isDateDisable = true;

    if (val == 4) {
      data = ['4'];
      this.searchForm.controls["selectSearchTypeIds"].setValue(data);
      this.searchForm.controls["sortingColName"].setValue("PUDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.Tradetype = 1;

    }
    else if (val == 7) {
      data = ['7'];
      this.searchForm.controls["selectSearchTypeIds"].setValue(data);
      this.searchForm.controls["sortingColName"].setValue("DPLastFreeDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.Tradetype = 1;
    }
    else if (val == 5) {
      data = ['5', '7', '8'];
      this.searchForm.controls["selectSearchTypeIds"].setValue(data);
      this.searchForm.controls["sortingColName"].setValue("PUResDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.Tradetype = 1;
    }
    else if (val == 6) {
      data = ['7'];
      this.searchForm.controls["selectSearchTypeIds"].setValue(data);
      this.searchForm.controls["sortingColName"].setValue("DPDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.Tradetype = 2;
    }
    else if (val == 8) {
      data = ['5', '6', '7', '8'];
      statusval = [1]
      this.searchForm.controls["selectSearchTypeIds"].setValue(data);
      this.searchForm.controls["statusIds"].setValue(statusval);
      this.searchForm.controls["sortingColName"].setValue("DPDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.Tradetype = 2;
    }
    else if (val == 9) {

      statusval = [12, 13]

      this.searchForm.controls["statusIds"].setValue(statusval);
      this.searchForm.controls["searchDateType"].setValue(0);
      this.searchForm.controls["fromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["toDate"].setValue(this.date);
      this.searchForm.controls["searchFromDate"].setValue(null);
      this.searchForm.controls["searchToDate"].setValue(null);
      this.searchForm.controls["sortingColName"].setValue("PUResDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.isDateDisable = false;
    }
    else if (val == 10) {

      statusval = [22, 23]

      this.searchForm.controls["statusIds"].setValue(statusval);
      this.searchForm.controls["searchDateType"].setValue(0);
      this.searchForm.controls["fromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
      this.searchForm.controls["toDate"].setValue(this.date);
      this.searchForm.controls["searchFromDate"].setValue(null);
      this.searchForm.controls["searchToDate"].setValue(null);
      this.searchForm.controls["sortingColName"].setValue("PUResDate");
      this.searchForm.controls["sortingColOrder"].setValue("1");
      this.isDateDisable = false;
    }





    this.getGridData(this.searchForm.value);

  }

  resetSearch() {

    this.searchButtonslst.forEach((element: any) => {
      element.bgStyle = "";
    });

    this.searchForm.controls["companyId"].setValue(0);
    this.searchForm.controls["type"].setValue(2);
    this.searchForm.controls["statusIds"].setValue('');
    this.searchForm.controls["loadStatusTypeIds"].setValue('');
    this.searchForm.controls["keyword"].setValue('');
    this.searchForm.controls["pageNo"].setValue(1);
    this.searchForm.controls["pageSize"].setValue(50);
    this.searchForm.controls["fromDate"].setValue(this.gl.getPreviousWeekDate(this.date));
    this.searchForm.controls["toDate"].setValue(this.date);
    this.searchForm.controls["billToId"].setValue(0);
    this.searchForm.controls["portStatusId"].setValue(0);
    this.searchForm.controls["searchFromDate"].setValue();
    this.searchForm.controls["searchToDate"].setValue();
    this.searchForm.controls["searchDateType"].setValue(0);
    this.searchForm.controls["isLoadingDate"].setValue(false);
    this.searchForm.controls["isEmptyReturnDate"].setValue(false);
    this.searchForm.controls["isVesselArrivalDate"].setValue(false);
    this.searchForm.controls["isPickupdate"].setValue(false);
    this.searchForm.controls["isPickupReservationDate"].setValue(false);
    this.searchForm.controls["isDropReservationDate"].setValue(false);
    this.searchForm.controls["isEarlyReturnDate"].setValue(false);
    this.searchForm.controls["isDropupLastFreeDate"].setValue(false);
    this.searchForm.controls["isPickupLastFreeDate"].setValue(false);
    this.searchForm.controls["fleetSearch"].setValue(0);
    this.searchForm.controls["selectSearchTypeIds"].setValue('');
    this.searchForm.controls["sortingColName"].setValue('');
    this.searchForm.controls["sortingColOrder"].setValue('1');
    this.searchForm.controls["sortingColName2"].setValue('');
    this.searchForm.controls["sortingColOrder2"].setValue('1');
    this.searchForm.controls["sortingColName3"].setValue();
    this.searchForm.controls["sortingColOrder3"].setValue('1');

    this.getGridData(this.searchForm.value);

  }

  OpenUploadexcelFilter() {
    let obj = { 'Title': 'Upload Excel', 'type': true }
    const dialogRef = this.dialog.open(ExcelUploadPopupComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result, 'result');

      let data = { 'file': result.file }

      const formData = new FormData();

      formData.append('documentTypeId', result.formatType);
      formData.append('documentName', result.fileName);
      formData.append('file', new Blob([result.binaryData]), result.fileName);

      this._srvContainerTrack.UploadExcel(formData, 0, result.formatType).subscribe((m: any) => {
        if (m.status) {

          this.OpenUploadexcelData(m.dataList);
        } else {
          this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
        }
      });
    });
  }

  OpenUploadexcelData(returnList: any) {
    let obj = { 'Title': 'Uploaded Data', 'List': returnList }
    const dialogRef = this.dialog.open(ExcelDataPopupComponent, {
      width: '800px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result,'result');

    });
  }

  GetContainerCount() {
    let data = [
      {
        "companyId": 0,
        "type": 1,
        "statusIds": "",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": null,
        "toDate": null,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": this.gl.getPreviousWeekDate,
        "searchToDate": this.date,
        "searchDateType": 1,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "PUDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "4",
        "getOnlyCount": 0
      },
      {
        "companyId": 0,
        "type": 1,
        "statusIds": "",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": null,
        "toDate": null,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": this.gl.getPreviousWeekDate,
        "searchToDate": this.date,
        "searchDateType": 1,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "DPLastFreeDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "6,7",
        "getOnlyCount": 0
      },
      {
        "companyId": 0,
        "type": 1,
        "statusIds": "",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": null,
        "toDate": null,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": this.gl.getPreviousWeekDate,
        "searchToDate": this.date,
        "searchDateType": 1,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "PUResDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "5,7,8",
        "getOnlyCount": 0
      },
      {
        "companyId": 0,
        "type": 2,
        "statusIds": "",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": null,
        "toDate": null,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": this.gl.getPreviousWeekDate,
        "searchToDate": this.date,
        "searchDateType": 1,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "DPDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "7",
        "getOnlyCount": 0
      },
      {
        "companyId": 0,
        "type": 2,
        "statusIds": "1",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": null,
        "toDate": null,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": this.gl.getPreviousWeekDate,
        "searchToDate": this.date,
        "searchDateType": 1,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "DPDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "5,6,7,8",
        "getOnlyCount": 0
      },
      {
        "companyId": 0,
        "type": 0,
        "statusIds": "12,13",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": this.gl.getPreviousWeekDate,
        "toDate": this.date,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": null,
        "searchToDate": null,
        "searchDateType": 0,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "PUResDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "",
        "getOnlyCount": 0
      }
      ,
      {
        "companyId": 0,
        "type": 0,
        "statusIds": "22,23",
        "loadStatusTypeIds": "",
        "keyword": "",
        "pageNo": 1,
        "pageSize": 50,
        "fromDate": this.gl.getPreviousWeekDate,
        "toDate": this.date,
        "billToId": 0,
        "portStatusId": 0,
        "searchFromDate": null,
        "searchToDate": null,
        "searchDateType": 0,
        "isLoadingDate": true,
        "isEmptyReturnDate": true,
        "isVesselArrivalDate": true,
        "isPickupdate": true,
        "isPickupReservationDate": true,
        "isDropReservationDate": true,
        "isEarlyReturnDate": true,
        "isDropupLastFreeDate": true,
        "isPickupLastFreeDate": true,
        "fleetSearch": 0,
        "sortingColName": "PUResDate",
        "sortingColOrder": "1",
        "sortingColName2": "",
        "sortingColOrder2": "1",
        "sortingColName3": "",
        "sortingColOrder3": "1",
        "jobStatusId": 0,
        "pickDropLocationId": 0,
        "selectSearchTypeIds": "",
        "getOnlyCount": 0
      }
    ]

    this._srvContainerTrack.GetContainerCount(data).subscribe((m: any) => {
      if (m.success) {
        // console.log(m.model[0], 'count model')
        this.searchButtonslst.forEach((element: any) => {
          if (element.id == 0) {
            element.count = m.model[0];
          }
          else if (element.id == 1) {
            element.count = m.model[1];
          }
          else if (element.id == 2) {
            element.count = m.model[2];
          } else if (element.id == 3) {
            element.count = m.model[3];
          } else if (element.id == 4) {
            element.count = m.model[4];
          } else if (element.id == 5) {
            element.count = m.model[5];
          }
          else if (element.id == 6) {
            element.count = m.model[6];
          }
        });

      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }

  ExportExcel() {
    this.loaderFlag = true;
    let exportData: any = [];

    this.getpaged.forEach((element: any) => {
      let item = {
        'ORDER NO': element.orderNumber,
        'ORDER TYPE': element.orderTypeId == 1 ? 'Import' : 'Export',
        'ORDER DATE': element.ordCreatedDate,
        'GT WT': element.grossWeight,
        'TR WT': element.tareWeight,
        'PU TVA': element.pickUpTVAId,
        'DP TVA': element.dropOffTVAId,
        'VESSEL/PORT': element.vesselDate,
        'CONTAINER NO': element.containerNo,
        'CONTAINER TYPE': element.containerType,
        'PORT STATUS': element.portStatusText,
        'VESSEL DATE': element.vesselDate,
        'BILL TO': element.billToName,
        'VESSEL NO': element.vesselNo,
        'SPOT LANE': element.spotLane,
        'DP DATE': element.ordCreatedDate,
        'PU LFD': element.puLastFreeDate,
        'DP LFD': element.dpLastFreeDate,
        'B/L NO': element.refNumber,
        'CONTAINER NOTES': element.orderNotes,
        'STATUS': element.statusName,
        'DROP AT': element.dpLastFreeDate,
        'DRIVER': element.driverName,
        'TRUCK': element.truckNumber,
        'CHASSIS': element.trailerNumber,
        'LOAD TYPE': element.loadStatusName,
        'TYPE': element.containerType,
        'SIZE': element.size,
        'DP TIME': element.dropOffReservationFromDateTime,
        'SHIP LINE': element.shippingLineName,
        'PU DATE': element.puDate,
        'PU RES NO': element.pickUpReservationNo,
        'DP RES DATE': element.dpResDate,
        'PU RES DATE': element.puResDate,
        'DP RES NO': element.dropOffReservationNo,
        'PU TIME': element.puResStTime,

      }
      exportData.push(item)
    });

    console.log(exportData)
    this.gl.exportAsExcelFile(exportData, "Container List");


    this.loaderFlag = false;

  }

  saveGridSettings() {
    let a:any = localStorage.getItem('TrackGridColOrder');
    console.log("🚀 ~ saveGridSettings ~ a:", a)
    let obj = {
      settingId: 0,
      settingGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      jsonData: a,
      createdBy: 0,
      createdDate: new Date(),
      modifiedBy: 0,
      modifiedAt: new Date(),
      companyId: 0,
      userId: 0,
      pagetype: 0,
      ordertypeId: this.Tradetype,
      isActive: true
    }
    let self = this;
    self._srvContainerTrack.updateTrackGrid(obj).subscribe((m:any) => {
      if (m.success) {
        this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }

  resetGridSettings() {
    let id = this.currentGridSetting.settingId;
    let self = this;
    self._srvContainerTrack.DeleteTrackGrid(id).subscribe((m:any) => {
      if (m.success) {
        localStorage.removeItem('TrackGridColOrder');
        window.location.reload();
        this._snackBar.open("Reset Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }

}