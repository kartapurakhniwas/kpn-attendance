import { Injectable } from '@angular/core';
import { APIconstant } from '../../constant/APIconstant';
import { FleetBaseService } from '../master/fleetBase.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FleetAPIService {
  constructor(private master: FleetBaseService) {}

  // Drivers

  getAllDrivers(): Observable<any> {
    return this.master.get(APIconstant.drivers.GetAllDriver);
  }
  getAllCarriers(): Observable<any> {
    return this.master.get(APIconstant.carrier.GetAllCarrier);
  }
  getAllTruck(): Observable<any> {
    return this.master.get(APIconstant.truck.GetAllTruck);
  }
  getAllTrailer(): Observable<any> {
    return this.master.get(APIconstant.trailer.GetAllTrailer);
  }
}
