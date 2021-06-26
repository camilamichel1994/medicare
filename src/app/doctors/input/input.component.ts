import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'doctors-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Output() onRegisterEvent = new EventEmitter<Doctor>();
  @Output() onUpdateEvent = new EventEmitter<Doctor>();

  doctorForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
    documentState: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  isEditing(): boolean {
    return this.doctorForm.get('id')?.value;
  }

  submit(): void {
    if (this.doctorForm.invalid) return;

    const doctor = new Doctor(
      this.doctorForm.get('id')?.value,
      this.doctorForm.get('name')?.value,
      this.doctorForm.get('document')?.value,
      this.doctorForm.get('documentState')?.value
    );
    if (this.isEditing()) {
      this.onUpdateEvent.emit(doctor);
    } else {
      this.onRegisterEvent.emit(doctor);
    }
    this.doctorForm.reset();
  }
}
