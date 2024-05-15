import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerPickdropLocationService {

  constructor(private master: BaseService) { }

  AddPickLocation(data:any): Observable<any> {
    return this.master.post(data, APIconstant.containerPickDropLocation.AddPickLocation);
  }

  UpdatePickLocation(data:any): Observable<any> {
    return this.master.put(data, APIconstant.containerPickDropLocation.UpdatePickLocation );
  }

  GetPickLocationByContainerId(id:any): Observable<any> {
    return this.master.get(APIconstant.containerPickDropLocation.GetPickLocationByContainerId + '?containerId=' + id);
  }

  AddDropLocation(data:any): Observable<any> {
    return this.master.post(data, APIconstant.containerPickDropLocation.AddDropLocation);
  }

  UpdateDropLocation(data:any): Observable<any> {
    return this.master.put(data, APIconstant.containerPickDropLocation.UpdateDropLocation );
  }

  GetDropLocationByContainerId(id:any): Observable<any> {
    return this.master.get(APIconstant.containerPickDropLocation.GetDropLocationByContainerId + '?containerId=' + id);
  }
}
