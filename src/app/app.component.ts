import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./ui/layouts/user/user.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, UserComponent]
})
export class AppComponent {
  title = 'smart-track-fe';
  authGuarded: any;
  constructor() {
    // this.authGuarded = ;
    console.log('authGuarded', this.authGuarded);
  }
  
}
