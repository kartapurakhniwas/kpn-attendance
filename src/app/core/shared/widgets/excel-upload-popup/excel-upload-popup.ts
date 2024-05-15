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
  templateUrl: "./excel-upload-popup.html",
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule,MatSelectModule]
})
export class ExcelUploadPopupComponent {
  @Output() btnOKClicked = new EventEmitter<string>();


  inputName: any;
  base64String: string | undefined;
  fileName: any;
  docTypeList: any;
  dataArray: any = [];
  docList: any;
  Doctype:any=1;

  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<ExcelUploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  ngOnInit() {
    console.log(this.data,'data')
    
  }
  ngAfterViewInit() {}

  public btnOK() {
    this.dialogRef.close(this.submitForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm = new FormGroup({
    companyId: new FormControl(0),
    formatType: new FormControl(0),
    file: new FormControl(''),
    binaryData:new FormControl(''),
    fileName:new FormControl(''),
  }) as any;

  fileUploaded(files:any) {
    if (files.target.files.length > 0) {

     
      let data=this.submitForm.value;
      let fileLists:any = Array.from(files.target.files);
      const fileToUpload = fileLists[0] as File;
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileToUpload);
      reader.onload = (event: any) => {
        
        const arrayBuffer = event.target.result as ArrayBuffer;
        const binaryData = new Uint8Array(arrayBuffer);
        const formData = new FormData();

        data.formatType=this.Doctype;
        data.binaryData=binaryData;
        data.fileName=fileToUpload.name;
        this.dataArray = formData;

  
      };
    }
  }
}
