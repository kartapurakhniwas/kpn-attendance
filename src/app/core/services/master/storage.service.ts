import { Injectable, Inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
    constructor() {
       
    }
    contentComponentIdList: any = [];

    add(key: string, value: any) {
        //console.log("key: ", key);
        this.remove(key);
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    get<T>(key: string): T {
        let value:any = localStorage.getItem(key);

        if (value && value !== "undefined" && value !== "null") {
            try {
                return <T>JSON.parse(value);
            } catch (ex) {
                 return null as any;
            }
        }
         return null as any;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

}
