import { Injectable } from '@angular/core';
import { APIconstant } from '../../constant/APIconstant';
import { BaseService } from '../master/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private master: BaseService) { }

  getAllCustomers(id:any) {
    return this.master.get(APIconstant.customer.GetAllCustomer + '/' + id);
  }


  AddCustomer(data: any) {
    // alert(JSON.stringify(data));
    return this.master.post(data, "STContainerApi/Customer/CreateCustomer");
  }
  update(data: any) {
    return this.master.put(data, "STContainerApi/Customer/UpdateCustomer");
  }
  Delete(id: any) {
    // console.log("User ID", data);
    return this.master.delete("STContainerApi/Customer/DeleteCustomer?customerId=" + id);
  }
  GetById(id: any) {
    // console.log("User ID", data);
    return this.master.get("STContainerApi/Customer/GetCustomerById?customerId=" + id);
  }

 
}
