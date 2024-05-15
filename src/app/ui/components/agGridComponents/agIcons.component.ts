import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'icon-component',
  template: `<span [innerHTML]="sanitizedHtml"></span>
  @if(iconValue.icon == 'date') {
    {{value | date}}
  } @else {
    {{value}}
  }
  `,
})

export class AgIconComponent implements ICellRendererAngularComp {
  icon: string = '';
  value: any;
  iconValue: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  agInit(params: any) {
    this.value = params.value;
    this.iconValue = params.iconData;
    switch (params.iconData.icon) {
      case 'mobile': {
        this.icon = `
        <i class="ki-duotone ki-phone table_icons" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>`
        break;
      }
      case 'powerDef': {
        this.icon = `
        <i class="ki-duotone ki-abstract-22" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        `
        break;
      }
      case 'truck': {
        this.icon = `
        <i class="ki-duotone ki-truck truck_icon" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
          <span class="path5"></span>
        </i>
        `
        break;
      }
      case 'carrier': {
        this.icon = ` <i class="ki-duotone ki-security-user table_icons truck_icon" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>`
        break;
      }
      case 'email': {
        this.icon = `
        <i class="ki-duotone ki-sms table_icons power_icon" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
        <span class="path1"></span>
        <span class="path2"></span>
       </i>
        `
        break;
      }
      case 'plate': {
        this.icon = `
        <i class="ki-duotone ki-devices table_icons truck_icon" style="color: ${params.iconData?.color}; font-size: ${params.iconData?.fontSize || '22px'}">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
        <span class="path5"></span>
       </i>
        `;
        break;
      }
      case 'date': {
        this.icon = `
        <i class="ki-duotone ki-calendar-2 table_icons power_icon">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
        <span class="path5"></span>
       </i>
        `
        break;
      }
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }
  
}