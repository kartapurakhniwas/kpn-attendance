import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerLoadingUnloadingLocationService {

  constructor(private master: BaseService) { }

  CreateLoadingUnLoadingLocation(data:any): Observable<any> {
    return this.master.post(data, APIconstant.containerLoadingUnloadinglocation.CreateLoadingUnLoadingLocation);
  }

  updateLoadingUnLoadingLocation(data:any): Observable<any> {
    return this.master.put(data, APIconstant.containerLoadingUnloadinglocation.updateLoadingUnLoadingLocation );
  }

  GetLoadingUnLoadingLocationByContainerId(id:any): Observable<any> {
    return this.master.get(APIconstant.containerLoadingUnloadinglocation.GetLoadingUnLoadingLocationByContainerId + '/' + id);
  }

  DeleteLoadingUnLoadingLocation(id:any): Observable<any> {
    return this.master.delete(APIconstant.containerLoadingUnloadinglocation.DeleteLoadingUnLoadingLocation + '/' + id);
  }
  
}
