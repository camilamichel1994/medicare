import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { PatientComponent } from './patient/patient.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListComponent, PatientComponent],
  imports: [CommonModule, SharedModule, NgxMaskModule.forRoot()],
})
export class ReportsModule {}
