import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerTrack {

  constructor(private master: BaseService) { }

  Search(data:any): Observable<any> {
    return this.master.post(data, APIconstant.ContainerTrack.Search);
  }

  AddFilter(data:any): Observable<any> {
    return this.master.post(data, APIconstant.TrackFilter.InsertFilter);
  }

  UpdadeFilter(data:any): Observable<any> {
    return this.master.put(data, APIconstant.TrackFilter.UpdateFilter);
  }

  GetAllSearchFilters(id:any): Observable<any> {
    return this.master.get(APIconstant.TrackFilter.GetAllSearchFilters + '/' + id);
  }

  Delete(id:any): Observable<any> {

    return this.master.delete(APIconstant.TrackFilter.DeleteFilter + '/' + id);
  }

  UpdateContainerInfo(data:any): Observable<any> {
    return this.master.post(data, APIconstant.ContainerTrack.UpdateContainerInfo);
  }

  UploadExcel(data:any,companyId:any,formatType:any): Observable<any> {
    return this.master.post(data, APIconstant.ContainerTrack.upload +'?companyId='+companyId +'&formatType='+formatType );
  }

  GetContainerCount(data:any): Observable<any> {
    return this.master.post(data, APIconstant.ContainerTrack.GetContainerCount);
  }

  GetContainernos(id:any): Observable<any> {

    return this.master.get(APIconstant.ContainerTrack.GetContainernos + '/' + id);
  }

  updateTrackGrid(data:any): Observable<any> {
    return this.master.put(data, APIconstant.ContainerTrack.updateTrackGrid);
  }

  GetTrackGrid(id:any): Observable<any> {
    return this.master.get(APIconstant.ContainerTrack.GetTrackGrid + '/' + id);
  }

  DeleteTrackGrid(id:any): Observable<any> {
    return this.master.delete(APIconstant.ContainerTrack.DeleteTrackGrid + '?id=' + id);
  }
}
