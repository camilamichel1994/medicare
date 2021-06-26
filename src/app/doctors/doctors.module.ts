import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { InputComponent } from './input/input.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListComponent, DoctorComponent, InputComponent],
  imports: [CommonModule, SharedModule, NgxMaskModule.forRoot()],
})
export class DoctorsModule {}
