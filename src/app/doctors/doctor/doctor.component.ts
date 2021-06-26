import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'doctors-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  @Input() doctor: Doctor = new Doctor();
  @Output() onRemoveEvent = new EventEmitter<Doctor>();
  @Output() onUpdateEvent = new EventEmitter<Doctor>();

  constructor() {}

  ngOnInit(): void {}

  onRemove(): void {
    const hasConfirmed = window.confirm(
      'Deseja mesmo deletar o registro: ' + this.doctor.name
    );
    if (hasConfirmed) {
      this.onRemoveEvent.emit(this.doctor);
    }
  }

  onEdit(): void {
    this.onUpdateEvent.emit(this.doctor);
  }
}
