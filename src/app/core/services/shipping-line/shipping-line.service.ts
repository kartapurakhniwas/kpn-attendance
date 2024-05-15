import { Injectable } from '@angular/core';
import { BaseService } from '../master/base.service';
import { APIconstant } from '../../constant/APIconstant';

@Injectable({
  providedIn: 'root'
})
export class ShippingLineService {

  constructor(private master: BaseService) { }

  getAllShippingLine(companyId: any) {
    return this.master.get("STContainerApi/ShippingLine/GetShippingLines/" + companyId);
  }

  AddShippingLine(data: any) {
    // alert(JSON.stringify(data));
    return this.master.post(data, "STContainerApi/ShippingLine/CreateShippingLine");
  }
  update(data: any) {
    return this.master.put(data, "STContainerApi/ShippingLine/UpdateShippingLine");
  }
  Delete(id: any) {
    // console.log("User ID", data);
    return this.master.delete("STContainerApi/ShippingLine/DeleteShippingLine?shippingLineId=" + id);
  }
  GetById(id: any) {
    // console.log("User ID", data);
    return this.master.get("STContainerApi/ShippingLine/GetShippingLineById?shippingLineId=" + id);
  }
  
}
