import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { DoctorService } from 'src/app/services/doctor.service';
import * as moment from 'moment';

@Component({
  selector: 'patients-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Output() onRegisterEvent = new EventEmitter<Patient>();
  @Output() onUpdateEvent = new EventEmitter<Patient>();

  doctorList: Doctor[] = [];
  hasError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  patientForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    doctor: new FormControl(null, Validators.required),
  });

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe((res) => {
      this.doctorList = res.data.itens;
      this.isLoading = false;
    });
  }

  isEditing(): boolean {
    return this.patientForm.get('id')?.value;
  }

  parseDate(date: string): string {
    const dateFormat = this.isEditing() ? 'DD/MM/YYYY' : 'DDMMYYYY';
    const parsedDate = moment(date, dateFormat);

    if (!parsedDate.isValid()) {
      this.hasError = true;
      this.errorMessage = 'Data inválida';
      this.patientForm.patchValue({ birthDate: '' });
      return '';
    }
    return parsedDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  submit(): void {
    if (this.patientForm.invalid) return;

    this.hasError = false;
    const birthday = this.parseDate(this.patientForm.get('birthDate')?.value);
    if (this.hasError) return;

    const patient = new Patient(
      this.patientForm.get('id')?.value,
      this.patientForm.get('name')?.value,
      birthday,
      this.patientForm.get('document')?.value,
      this.patientForm.get('doctor')?.value,
      this.patientForm.get('doctor')?.value.id
    );
    if (this.isEditing()) {
      this.onUpdateEvent.emit(patient);
    } else {
      this.onRegisterEvent.emit(patient);
    }
    this.patientForm.reset();
  }

  compareSelection(d1: Doctor, d2: Doctor): boolean {
    return d1?.id === d2?.id;
  }
}
