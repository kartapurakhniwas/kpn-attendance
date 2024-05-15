import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class AssignContainerService {

  constructor(private master: BaseService) { }

  getContainersByOrderId(id:any): Observable<any> {
    return this.master.get(APIconstant.containerAssignment.getcontainerAssignmentById + "/" + id);
  }

  UpdateContainerLoad(data: any) {
    return this.master.post(data, APIconstant.containerAssignment.UpdateContainerLoad);
  }

  getContainerPlanns(id: any) {
    return this.master.get(APIconstant.containerAssignment.getContainerPlanns + "/" + id);
  }

  
  GetHistory(id:any): Observable<any> {
    return this.master.get(APIconstant.containerAssignment.GetHistory + "/" + id);
  }

  
  UndoHistory(id:any): Observable<any> {
    return this.master.put({}, APIconstant.containerAssignment.UndoHistory + "?containerId=" + id);
  }

  SavePlanner(data: any) {
    return this.master.post(data, APIconstant.containerAssignment.SavePlanners);
  }

  fastFarward(fromId:any, toId:any) {
    return this.master.post({}, APIconstant.containerAssignment.AutoCompleteLeg + "?startPlannerId=" + fromId + "&toPlannerId=" + toId);
  }
}
