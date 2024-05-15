import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: "app-input-popup",
  templateUrl: "./excel-data-popup.html",
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule,MatSelectModule]
})
export class ExcelDataPopupComponent {
  @Output() btnOKClicked = new EventEmitter<string>();


  containerList: any;


  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<ExcelDataPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  ngOnInit() {
    console.log(this.data,'data')
  this.containerList=this.data.List;
  }
  ngAfterViewInit() {}

  public btnOK() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
}
