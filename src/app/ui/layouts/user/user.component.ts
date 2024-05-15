import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatExpansionModule, MatButtonModule, RouterModule, MatMenuModule, MatTooltipModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  sideFlag:boolean = true;
  hovered:boolean = false;
  url: string = '';

  constructor(){}

  ngOnInit() {
    this.url = window.location.origin;
    let a = this.url.split(':', 2);
    this.url = a[0] + ':' + a[1] + ':8998';
  }

  mouseOver(event:any) {
    // console.log(event, "event");
    this.sideFlag = false;
    this.hovered = true;
  }

  mouseOut(event:any) {
    console.log(this.sideFlag , this.hovered , "before");
    if (!this.sideFlag && this.hovered) {
      this.hovered = false;
      this.sideFlag = true;
    }
    
    console.log(this.sideFlag , this.hovered , "after");
  }
}   
 