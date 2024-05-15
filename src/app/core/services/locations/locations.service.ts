import { Injectable } from '@angular/core';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private master: BaseService) { }

  getAllLocations(locationType:number) {
    return this.master.get(APIconstant.locations.GetAllLocations + '?LocationTypes=' + locationType + '&CompanyId=' + 0);
  }

  getLocationById(id:any): Observable<any> {
    return this.master.get( APIconstant.locations.getLocationById + '/' + id);
  }
  AddLocation(data:any): Observable<any> {
    return this.master.post(data, APIconstant.locations.AddLocation);
  }

  UpdateLocation(data:any): Observable<any> {
    return this.master.put(data, APIconstant.locations.UpdateLocation);
  }

  
  deleteLocation(id:any): Observable<any> {
    return this.master.delete(APIconstant.locations.deleteLocation + '/' + id);
  }

  getPickDropLocations() {
    return this.master.get(APIconstant.locations.GetAllLocations + '?LocationTypes=1&LocationTypes=3&CompanyId=' + 0);
  }
 
}
