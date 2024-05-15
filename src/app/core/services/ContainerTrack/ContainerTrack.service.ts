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

}
