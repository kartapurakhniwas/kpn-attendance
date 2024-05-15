export const APIconstant = {
  orders: {
    GetAllOrders: 'STContainerApi/Order/GetAllOrders',
    GetOrderById: 'STContainerApi/Order/GetOrderById',
    GetOrderByGuid: 'STContainerApi/Order/GetOrderByGuid',
    DeleteOrder: 'STContainerApi/Order/DeleteOrder',
    AddOrder: 'STContainerApi/Order/AddOrder',
    UpdateOrder: 'STContainerApi/Order/UpdateOrder',
    // AddChassis: 'STContainerApi/Order/AddChassis',
    UploadExcel:'STContainerApi/ImportExcelFileData/UploadOrderExcelFile',
    UploadContainerExcelFile:'STContainerApi/ImportExcelFileData/UploadContainerExcelFile',
  },

  customer: {
    GetAllCustomer: 'STContainerApi/Customer/GetCustomers',
    GetChassisById: 'Chassis/GetChassisById',
    AddChassis: 'Chassis/AddChassis',
  },

  locations: {
    GetAllLocations: 'STContainerApi/Location/GetLocationsByType',
    AddLocation: 'STContainerApi/Location',
    UpdateLocation: 'STContainerApi/Location',
    getLocationById: 'STContainerApi/Location/GetLocationById',
    deleteLocation: 'STContainerApi/Location/DeleteLocation'
  },

  container: {
    AddNewContainer: 'STContainerApi/Container/AddNewContainer',
    UpdateContainer: 'STContainerApi/Container/UpdateContainer',
    getContainersByOrderId: 'STContainerApi/Container/ContainersByOrderId',
    getContainerById: 'STContainerApi/Container/ContainerById',
    UploadDocuments: 'STContainerApi/ContainerDocument/UploadDocuments',
    GetDocuments: 'STContainerApi/ContainerDocument/GetContainerDocument',
    DeleteDocument: 'STContainerApi/ContainerDocument/DeleteDocument',
  },

  containerAssignment: {
    getcontainerAssignmentById: 'STContainerApi/ContainerAssign/GetContainerAssignments',
    UpdateContainerLoad: 'STContainerApi/ContainerAssign/UpdateContainerLoad',
    getContainerPlanns: 'STContainerApi/ContainerAssign/GetContainerPlans',
    AssignContainer: 'STContainerApi/ContainerAssign/AssignContainer',
    GetHistory:'STContainerApi/ContainerAssign/GetHistory',
    UndoHistory:'STContainerApi/ContainerAssign/UndoHistory',
    SavePlanners:'STContainerApi/ContainerAssign/SavePlanner',
    AutoCompleteLeg:'STContainerApi/ContainerAssign/AutoCompleteLeg',
  },

  shippingLine: {
    GetAllShippingLine: 'STContainerApi/ShippingLine/GetShippingLines',
    GetChassisById: 'Chassis/GetChassisById',
    AddChassis: 'Chassis/AddChassis',
  },

  master: {
    ICountry: 'STMasterApi/Master/GetCountries',
    IStateByCountry: 'STMasterApi/Master/GetStatesByCountry',
    ICityByState: 'STMasterApi/Master/GetCitiesByStateId',
    IRateZone: 'STMasterApi/Master/GetRateZoneMasters',
    IAddressType: 'STMasterApi/Master/GetAddressTypes',
    IGender: 'STMasterApi/Master/GetGenders',
    ICustomerContactType: 'STMasterApi/Master/GetContactTypes',
    ITruckType: 'STMasterApi/Master/GetTruckTypes',
    ITruckMake: 'STMasterApi/Master/GetTruckMake',
    IEquipmentType: 'STMasterApi/Master/GetEquipmentType',
    GetTrailerStatus: 'STMasterApi/Master/GetTrailerStatus',
    GetTrailerType: 'STMasterApi/Master/GetTrailerType',
    GetTrailerManufecturer: 'STMasterApi/Master/GetTrailerManufecturer',
    GetEmailTypes: 'STMasterApi/Master/GetEmailTypes',
    GetOrderStatus: 'STMasterApi/Master/GetOrderStatus',
    GetCurrency: 'STMasterApi/Master/GetCurrency',
    GetLegTypes: 'STMasterApi/Master/GetLegTypes',
    GetLocationType: 'STMasterApi/Master/GetLocationType',
    GetContainerLoadStatus: 'STMasterApi/Master/ContainerLoadStatus',
    GetContainerStatus: 'STMasterApi/Master/GetContainerStatus',
    GetContainerType: 'STMasterApi/Master/GetContainerType',
    GetUnits: 'STMasterApi/Master/GetUnits',
    GetPortStatus: 'STMasterApi/Master/GetPortStatus',
    GetDocumentTypes: 'STMasterApi/Master/GetDocumentTypes',
  },

  // FLEET API

  fleetMaster: {
    ICountry: 'Master/GetCountries',
    IStateByCountry: 'Master/GetStatesByCountry',
    ICityByState: 'Master/GetCitiesByStateId',
    IRateZone: 'Master/GetRateZoneMasters',
    ITimeZone: 'Master/GetTimeZones',
    IAddressType: 'Master/GetAddressTypes',
    IGender: 'Master/GetGenders',
    IEmailType: 'Master/GetEmailTypes',
    ICustomerContactType: 'Master/GetContactTypes',
    ITruckType: 'Master/GetTruckTypes',
    ITruckMake: 'Master/GetTruckMake',
    IEquipmentType: 'Master/GetEquipmentType',
    GetTrailerStatus: 'Master/GetTrailerStatus',
    GetTrailerType: 'Master/GetTrailerType',
    GetTrailerManufecturer: 'Master/GetTrailerManufecturer',
    GetEmailTypes: 'Master/GetEmailTypes'
  },


  drivers: {
    GetAllDriver: 'Driver/GetAll?companyId=7',
  },
  carrier: {
    GetAllCarrier: 'Carrier/7',
  },
  truck: {
    GetAllTruck: 'Truck/GetAllTrucks?companyId=7',
  },
  trailer: {
    GetAllTrailer: 'Trailer/GetAllTrailers?companyId=7',
  },

  containerPickDropLocation:{
    AddPickLocation: 'STContainerApi/ContainerPickDropLocation/AddPickLocation',
    GetPickLocationByContainerId: 'STContainerApi/ContainerPickDropLocation/GetPickLocationByContainerId',
    UpdatePickLocation: 'STContainerApi/ContainerPickDropLocation/UpdatePickLocation',
    AddDropLocation: 'STContainerApi/ContainerPickDropLocation/AddDropLocation',
    GetDropLocationByContainerId: 'STContainerApi/ContainerPickDropLocation/GetDropLocationByContainerId',
    UpdateDropLocation: 'STContainerApi/ContainerPickDropLocation/UpdateDropLocation',

  },
containerLoadingUnloadinglocation:{
  CreateLoadingUnLoadingLocation:'STContainerApi/ContainerLoadingUnLoadingLocation/CreateLoadingUnLoadingLocation',
  updateLoadingUnLoadingLocation:'STContainerApi/ContainerLoadingUnLoadingLocation/updateLoadingUnLoadingLocation',
  DeleteLoadingUnLoadingLocation:'STContainerApi/ContainerLoadingUnLoadingLocation/DeleteLoadingUnLoadingLocation',
  GetLoadingUnLoadingLocationByContainerId:'STContainerApi/ContainerLoadingUnLoadingLocation/GetLoadingUnLoadingLocationByContainerId',
},
ContainerTrack:{
  Search:'STContainerApi/ContainerTrack/Search',
  GetAllSearchFilters:'STContainerApi/ContainerTrack/GetAllSearchFilters',
  InsertFilter:'STContainerApi/ContainerTrack/InsertFilter',
  UpdateFilter:'STContainerApi/ContainerTrack/UpdateFilter',
  DeleteFilter:'STContainerApi/ContainerTrack/DeleteFilter',
  UpdateContainerInfo:'STContainerApi/ContainerTrack/UpdateContainerInfo',
  upload:'STContainerApi/ImportExcelFileData/UploadTrackExcelFile',
  GetContainerCount:'STContainerApi/ContainerTrack/GetContainerCount',
  GetContainernos:'STContainerApi/ContainerTrack/GetContainernos',
  updateTrackGrid: 'STContainerApi/Settings/updateTrackGrid',
  DeleteTrackGrid: 'STContainerApi/Settings/DeleteTrackGrid',
  GetTrackGrid: 'STContainerApi/Settings/GetTrackGrid',
},
TrackFilter:{
  
  GetAllSearchFilters:'STContainerApi/TrackFilter/GetAllSearchFilters',
  InsertFilter:'STContainerApi/TrackFilter/InsertFilter',
  UpdateFilter:'STContainerApi/TrackFilter/UpdateFilter',
  DeleteFilter:'STContainerApi/TrackFilter/DeleteFilter',

}

};
