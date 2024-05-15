import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  imports: [MatCheckboxModule, ],
  selector: 'ag-col-filter',
  template: `
  
  @for(col of newCol; track col.field) {
    <mat-checkbox></mat-checkbox>
                    }
  `,
})
export class AgColumnFilterComponent {
    @Input() Cols: any = {};
    newCol:any = {};

    ngOnInit(){
        this.refresh()
    }

    refresh() {
        this.newCol = {};
        this.Cols.forEach((element:any) => {
            this.newCol.field = element.field;
            this.newCol.width = element.width;
        });
    }
}
