import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private master: BaseService) { }

  addContainer(id:any): Observable<any> {
    return this.master.post({}, APIconstant.container.AddNewContainer + '?orderId=' + id);
  }

  updateContainer(data:any): Observable<any> {
    return this.master.put(data, APIconstant.container.UpdateContainer);
  }

  getContainersByOrderId(id:any): Observable<any> {
    return this.master.get(APIconstant.container.getContainersByOrderId + '?orderId=' + id);
  }

  getContainerById(id:any): Observable<any> {
    return this.master.get(APIconstant.container.getContainerById + '?containerId=' + id);
  }

  uploadDocuments(data:any){
    return this.master.post(data, APIconstant.container.UploadDocuments);
  }

  getDocuments(containerId:any){
    return this.master.get(APIconstant.container.GetDocuments + '/' + containerId );
  }

  deleteDocument(docId:any) {
    return this.master.delete(APIconstant.container.DeleteDocument + '/' + docId );
  }
}
