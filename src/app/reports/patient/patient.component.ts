import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import * as moment from 'moment';

@Component({
  selector: 'reports-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient = new Patient();

  constructor() {}

  ngOnInit(): void {}

  parseDate(date: string): string {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss:ms').format('DD/MM/YYYY');
  }
}
