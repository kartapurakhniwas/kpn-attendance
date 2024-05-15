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
import { ConfirmationDialog } from "../../../models/interfaces/IConfirmationDialog";

@Component({
  standalone: true,
  selector: "app-confirm",
  templateUrl: "./confirmation.html",
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmationComponent {
  @Output() btnOKClicked = new EventEmitter<string>();
  @Input() Title: string = "Are you sure?";
  @Input() ID: string = "commonModal";
  @Input() Desc: string = "";
  @Input() Operation: string = "Confirm";

  GRNSendData: any;
  GRNSendDataStatus: boolean = false;

  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ConfirmationDialog 
  ) {}
  ngOnInit() {
    if (this.data) {
      this.Desc = this.data.Desc;
    }
  }
  ngAfterViewInit() {}

  public btnOK() {
    this.dialogRef.close("OK");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
