import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import * as moment from 'moment';

@Component({
  selector: 'patients-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient = new Patient();
  @Output() onRemoveEvent = new EventEmitter<Patient>();
  @Output() onUpdateEvent = new EventEmitter<Patient>();

  constructor() {}

  ngOnInit(): void {}

  parseDate(date: string): string {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss:ms').format('DD/MM/YYYY');
  }

  onRemove(): void {
    const hasConfirmed = window.confirm(
      'Deseja mesmo deletar o registro: ' + this.patient.name
    );
    if (hasConfirmed) {
      this.onRemoveEvent.emit(this.patient);
    }
  }

  onEdit(): void {
    this.onUpdateEvent.emit(this.patient);
  }
}
