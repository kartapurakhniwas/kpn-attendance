import { PipeModule } from './../../../../core/shared/pipes/pipes.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContainerService } from '../../../../core/services/container/container.service';
import { MasterCallService } from '../../../../core/services/master-services/master-services.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../../../../../environments/environment';

@Component({
    standalone: true,
    selector: 'uplaod-doc-tab-component',
    templateUrl: 'upload-doc-tab.component.html',
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        PipeModule,
        MatTooltipModule
    ]
})
export class UploadDocTabComponent {
  @Input() selectedContainerId: any;
  @Input() selectedOrderId: any;
    base64String: string | undefined;
  fileName: any;
  docTypeList: any;
  dataArray: any = [];
  docList: any;
  url: string;

    constructor(private _snackBar: MatSnackBar, private srv: ContainerService, private master: MasterCallService) {
      this.url = environment.apiUrl;
    }

    ngOnChanges() {
      this.getDocumentTypes();
      
    }
    
    getDocumentTypes() {
      console.log("changed");
      let self = this;
      self.master.GetDocumentTypes().subscribe((m) => {
        if (m.success) {
          this.docTypeList = m.lstModel;
          this.getDocuments()
        } 
      });
    }

    getDocuments() {
      let self = this;
      self.srv.getDocuments(this.selectedContainerId).subscribe((m) => {
        if (m.success) {
          this.docList = m.lstModel;
          this.docList.forEach((element:any) => {
              const parts = element.documentPath.split('.');
              element.docExt = parts[1];
          });
        } 
      });
    }

    Form = new FormGroup({
      doc: new FormControl('',Validators.required),
      documentTypeId: new FormControl(1,Validators.required)
    }) as any;

    fileUploaded(files:any) {
      if (files.target.files.length > 0) {
        let data = this.Form.value;
        let fileLists:any = Array.from(files.target.files);
        const fileToUpload = fileLists[0] as File;
        const reader = new FileReader();
        reader.readAsArrayBuffer(fileToUpload);
        reader.onload = (event: any) => {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const binaryData = new Uint8Array(arrayBuffer);
          const formData = new FormData();
          formData.append('containerDocumentId', '0');
          formData.append('documentTypeId', data.documentTypeId);
          formData.append('containerId', this.selectedContainerId);
          formData.append('documentName', this.fileName);
          formData.append('orderId', this.selectedOrderId);
          formData.append('file', new Blob([binaryData]), fileToUpload.name);
          this.dataArray = formData;
        };
      }
    }
    
    save() {
      if (this.Form.valid) {
        let self = this;
        self.srv.uploadDocuments(this.dataArray).subscribe((m:any) => {
          if (m.success) {
            this.dataArray = [];
            this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
            this.getDocuments();
          }
        });
      } else {
        this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
      }
    }

    deleteDoc(id:any) {
      let self = this;
        self.srv.deleteDocument(id).subscribe((m:any) => {
          if (m.success) {
            this._snackBar.open("Deleted Successfully!", "Okay", { 'duration': 3000 });
            this.getDocuments();
          }
        });
    }

} 