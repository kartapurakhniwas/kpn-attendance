import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';
import { FleetBaseService } from '../master/fleetBase.service';

@Injectable({
  providedIn: 'root'
})
export class MasterCallService {

  constructor(private master: BaseService, private fleetMaster: FleetBaseService) { }

  // getAllCountries() {
  //   return this.master.get(APIconstant.master.ICountry);
  // }

  // getStateWithCountry(id:any) {
  //   return this.master.get(APIconstant.master.IStateByCountry + '?countryId=' + id);
  // }

  // getCityWithState(id:any) {
  //   return this.master.get(APIconstant.master.ICityByState + '?stateId=' + id);
  // }

 

  getEquipmentType() {
    return this.master.get(APIconstant.master.IEquipmentType);
  }

  GetTrailerStatus() {
    return this.master.get(APIconstant.master.GetTrailerStatus);
  }

  GetTrailerType() {
    return this.master.get(APIconstant.master.GetTrailerType);
  }

  GetManufecturer() {
    return this.master.get(APIconstant.master.GetTrailerManufecturer);
  }

  GetGenders() {
    return this.master.get(APIconstant.master.IGender);
  }

  GetEmailTypes() {
    return this.master.get(APIconstant.master.GetEmailTypes);
  }

  GetOrderStatus() {
    return this.master.get(APIconstant.master.GetOrderStatus);
  }

  GetCurrency() {
    return this.master.get(APIconstant.master.GetCurrency);
  }

  GetLegTypes() {
    return this.master.get(APIconstant.master.GetLegTypes);
  }

  getLocationTypes() {
    return this.master.get(APIconstant.master.GetLocationType);
  }

  GetContainerStatus(OrderTypeId:any) {
    return this.master.get(APIconstant.master.GetContainerStatus + '?OrderType=' + OrderTypeId);
  }

  GetContainerLoadStatus() {
    return this.master.get(APIconstant.master.GetContainerLoadStatus);
  }

  GetContainerType() {
    return this.master.get(APIconstant.master.GetContainerType);
  }

  GetUnits() {
    return this.master.get(APIconstant.master.GetUnits);
  }

  GetDocumentTypes() {
    return this.master.get(APIconstant.master.GetDocumentTypes);
  }
  

  // Fleet Master Services

  getAllCountries() {
    return this.fleetMaster.get(APIconstant.fleetMaster.ICountry);
  }

  getStateWithCountry(id:any) {
    return this.fleetMaster.get(APIconstant.fleetMaster.IStateByCountry + '?countryId=' + id);
  }

  getCityWithState(id:any) {
    return this.fleetMaster.get(APIconstant.fleetMaster.ICityByState + '?stateId=' + id);
  }

  getEmailTypeId() {
    return this.fleetMaster.get(APIconstant.fleetMaster.IEmailType);
  }

  getRateZoneMaster() {
    return this.fleetMaster.get(APIconstant.fleetMaster.IRateZone);
  }


  getAddressTypes() {
    return this.fleetMaster.get(APIconstant.fleetMaster.IAddressType);
  }
  
  GetPortStatus() {
    return this.master.get(APIconstant.master.GetPortStatus);
  }

  getTimeZone() {
    return this.fleetMaster.get(APIconstant.fleetMaster.ITimeZone);
  }
  
}
