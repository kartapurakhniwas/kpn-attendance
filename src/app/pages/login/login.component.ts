import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/master/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/master/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  data: any[] = []; // Initialize data as empty array
  accessToken: any;
  passCheck:boolean = false;

  userForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  }) as any;
  // loginLoader: boolean = false;

  constructor(
    private supabase: AuthService,
    private st: StorageService,
    private _snackBar: MatSnackBar
  ) {
    this.supabase.onStateChange();
  }

  onSubmit() {
    if(this.userForm.valid) {
      this.supabase.signInWithPassword(this.userForm.value);
    } else {
      for (let i in this.userForm.controls) {
        this.userForm.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
    }
  }

  // passChange() {
  //   if (this.passCheck == 'text') {
  //     this.passCheck = 'password';
  //   } else {
  //     this.passCheck = 'text';
  //   }
  // }
  

  // async onSubmit() {
  //   try {
  //     const { data: user, error } = await this.supabase.supabaseClient.auth.signInWithPassword({
  //       email: this.email,
  //       password: this.password
  //     });

  //     if (error) {
  //       console.error('Sign-in error:', error);
  //     } else {
  //       console.log('User signed in:', user);
  //       this.accessToken = user.session.access_token;
  //       this.st.add('kpn-attandance-token', this.accessToken);
  //       await this.getData(); // Call getData() after successful login
  //     }
  //   } catch (error) {
  //     console.error('Sign-in error:', error);
  //   }
  // }

  // async getData() {
  //   try {
  //     this.data = await this.supabase.getData('users', this.accessToken);
  //     console.log(this.data, "this.data");
      
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }    
  // }

}