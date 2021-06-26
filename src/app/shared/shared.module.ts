import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TextinputComponent } from './textinput/textinput.component';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, TextinputComponent, ButtonComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    SidenavComponent,
    TextinputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
