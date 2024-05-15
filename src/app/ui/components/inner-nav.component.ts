import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [MatButtonModule,MatIconModule,RouterModule],
  selector: 'nav-items',
  template: ` 
     <a href="javascript:void(0)" routerLink="/import-orders">Import Orders</a>
        <a href="javascript:void(0)" routerLink="/export-orders">Export Orders</a>
        <a href="javascript:void(0)" routerLink="/import-export-container">Import/Export Containers</a>
        <span class="mid-divider"></span>
        <button mat-icon-button class="badge-btn">
            <!-- <mat-icon>notifications</mat-icon> -->
            <i class="ki-duotone ki-notification">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            </i>
            <span class="count-badge">9</span>
        </button>
        <button mat-icon-button class="badge-btn">
            <!-- <mat-icon>widgets</mat-icon> -->
            <i class="ki-duotone ki-category">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            </i>
            <span class="count-badge">1</span>
        </button>
        <button mat-icon-button class="badge-btn">
            <!-- <mat-icon>library_add_check</mat-icon> -->
            <i class="ki-duotone ki-copy-success">
            <span class="path1"></span>
            <span class="path2"></span>
            </i>
            <span class="count-badge red">2</span>
        </button>
        <button mat-icon-button class="badge-btn">
            <!-- <mat-icon>inventory_2</mat-icon> -->
            <i class="ki-duotone ki-information">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            </i>
            <span class="count-badge">!</span>
        </button>
  `,
})
export class NavItems {

  constructor() {}

}