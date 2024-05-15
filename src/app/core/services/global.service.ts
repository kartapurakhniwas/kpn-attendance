import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver-es";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx"; 
@Injectable({
  providedIn: 'root',
})
export class GlobalVariable {
  setRowData: any = null;
  selectedOrder: any = null;
  updatedColDef: any;

  timeToDateTime(time: string) {
    const today = new Date();
    const dateTimeString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}T${time}:00`;
    return new Date(dateTimeString);
  }

  dateToTimeString(date:Date) {
    let a = new Date(date);
    return a.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  getPreviousMonthDate(date: Date): Date {
    const newDate = new Date(date.getTime()); 
    newDate.setMonth(newDate.getMonth() - 1); 

    if (newDate.getDate() !== date.getDate()) {
      newDate.setDate(0);
    }

    return newDate;
  }

  getPreviousWeekDate(date: Date): Date {
    const newDate = new Date(date.getTime()); 
    newDate.setDate(newDate.getDay() - 7); 

    if (newDate.getDate() !== date.getDate()) {
      newDate.setDate(0);
    }

    return newDate;
  }

  // Save Column options AG Grid

  addValueGetterIdentifier(array1: any[], array2: any[]): any[] {
    // Create a map from array2 for easy access
    const map = new Map(array2.map(item => [item.field, item.valueGetterIdentifier]));

    // Update array1 with valueGetterIdentifier from array2
    array1.forEach(item => {
        if (map.has(item.field)) {
            item.valueGetterIdentifier = map.get(item.field);
        }
    });

    const map2 = new Map(array2.map(item => [item.field, item.cellRendererIdentifier]));

    // Update array1 with cellRendererIdentifier from array2
    array1.forEach(item => {
        if (map2.has(item.field)) {
            item.cellRendererIdentifier = map2.get(item.field);
        }
    });

    return array1;
}

  onDisplayedColumnsChanged(params: any, oldColumns:any, colDefs:any, gridName:string) {
    let a:any = localStorage.getItem(gridName);
    if (a != null || undefined) {
      if (oldColumns) {
        const currentOrder = params.api.getColumnDefs().map((col:any) => col.colId);
        const hasChanged = JSON.stringify(oldColumns) !== JSON.stringify(currentOrder);
        if (hasChanged) {
          oldColumns = currentOrder;
          // Saving in Local storage
          let currentColumnDefs = params.api.getColumnDefs();
          let data = this.addValueGetterIdentifier(currentColumnDefs, colDefs);
          if (data) {
            localStorage.setItem(gridName, JSON.stringify(data));
          }
        }
      }
    }
  }

  // Get and Set Column options AG Grid

  setColmDefs(api:any, gridName:string, valueGetters:any, cellRendrers?:any) {
    let a:any = localStorage.getItem(gridName);
    if (a != null || undefined) {
      const savedColumnDefs = JSON.parse(a);
      console.log("🚀 ~ GlobalVariable ~ savedColumnDefs.forEach ~ savedColumnDefs:", savedColumnDefs)
      // Restore column definitions with actual valueGetter functions
      savedColumnDefs.forEach((column:any) => {
        if (column.valueGetterIdentifier && valueGetters[column.valueGetterIdentifier]) {
            column.valueGetter = valueGetters[column.valueGetterIdentifier];
            delete column.valueGetterIdentifier; // Remove the identifier
        }
        if (column.cellRendererIdentifier && cellRendrers[column.cellRendererIdentifier]) {
            column.cellRenderer = cellRendrers[column.cellRendererIdentifier];
            delete column.cellRendererIdentifier; // Remove the identifier
        }
      });
     
      api.updateGridOptions({ columnDefs: savedColumnDefs })
      this.updatedColDef = savedColumnDefs;
    }
  }

  hiddeShowCol(event:any, index:any, api:any) {
    if (event.checked == true) {
      let a:any = this.updatedColDef;
      a[index].hide = false;
      api.updateGridOptions({ columnDefs:  a});
    } 
    else {
      let a:any = this.updatedColDef;
      a[index].hide = true;
      api.updateGridOptions({ columnDefs:  a});
    }
  }

  // Export Excel Files

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }


  
}