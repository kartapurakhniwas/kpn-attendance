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
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "app-input-popup",
  templateUrl: "./input-popup.html",
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule]
})
export class InputPopupComponent {
  @Output() btnOKClicked = new EventEmitter<string>();


  inputName: any;

  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<InputPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  ngOnInit() {
    console.log(this.data,'data')
    this.inputName= this.data.inputName;
  }
  ngAfterViewInit() {}

  public btnOK() {
    this.dialogRef.close(this.inputName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
