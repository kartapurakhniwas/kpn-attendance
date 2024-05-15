import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private master: BaseService) { }

  // Driver

  getAllOrders(orderType:number, data:any) {
    return this.master.post(data, APIconstant.orders.GetAllOrders + '?orderType=' + orderType);
  }

  getOrderById(id:any) {
    return this.master.get(APIconstant.orders.GetOrderById + '?OrderId=' + id);
  }

  getOrderByGuid(id:any) {
    return this.master.get(APIconstant.orders.GetOrderByGuid + '?OrderGuid=' + id);
  }

  AddOrder(data:any): Observable<any> {
    return this.master.post(data, APIconstant.orders.AddOrder);
  }

  UpdateOrder(data:any): Observable<any> {
    return this.master.put(data, APIconstant.orders.UpdateOrder);
  }

  deleteDriver(id:any) {
    return this.master.delete(APIconstant.orders.DeleteOrder + '?OrderId=' + id);
  }

  UploadExcel(data:any): Observable<any> {
    return this.master.post(data, APIconstant.ContainerTrack.upload);
  }

  UploadExcelOrder(data:any): Observable<any> {
    return this.master.post(data, APIconstant.orders.UploadExcel);
  }

  UploadContainerExcelFile(data:any, orderId:any): Observable<any> {
    return this.master.post(data, APIconstant.orders.UploadContainerExcelFile + '/?orderId=' + orderId);
  }

  // updateDriverAddress(id:number, data:any): Observable<any> {
  //   return this.master.put(data, APIconstant.orders.UpdateDriverAddress + '?driverId=' + id);
  // }

  // getAddressByDriverId(id:any): Observable<any> {
  //   return this.master.get( APIconstant.orders.GetAdressesByDriverId + id);
  // }
  
  // removeDriverAddress(id:any) {
  //   return this.master.delete(APIconstant.orders.DeleteDriverAddress + id);
  // }

}
