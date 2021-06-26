import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { PatientService } from 'src/app/services/patient.service';
import { InputComponent } from '../input/input.component';
import * as moment from 'moment';

@Component({
  selector: 'patients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild(InputComponent) patientsInput: InputComponent;

  patients: Patient[] = [];
  currentPatientIndex: number;
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private patientService: PatientService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.navigation.show();
    this.isLoading = true;
    this.patientService.getPatients().subscribe((resPatients) => {
      this.patients = resPatients.data.itens;
      this.isLoading = false;
    });
  }

  registerPatient(patient: Patient): void {
    this.isLoading = true;
    this.patientService.insertPatient(patient).subscribe(
      (res) => {
        patient.id = res.data.patient.id;
        this.patients.push(patient);
        this.isLoading = false;
      },
      ({ status, statusText }) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = `Erro ao gravar: ${status} - ${statusText}`;
      }
    );
  }

  updatePatient(patient: Patient): void {
    this.isLoading = true;
    this.patientService.editPatient(patient).subscribe(
      () => {
        this.patients[this.currentPatientIndex] = patient;
        this.isLoading = false;
      },
      ({ status, statusText }) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = `Erro ao atualizar: ${status} - ${statusText}`;
      }
    );
  }

  removePatient(patient: Patient, index: number): void {
    if (patient.id) {
      this.isLoading = true;
      this.patientService.removePatient(patient.id).subscribe(
        () => {
          this.patients.splice(index, 1);
          this.isLoading = false;
        },
        ({ status, statusText }) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = `Erro ao remover: ${status} - ${statusText}`;
        }
      );
    }
  }

  populatePatientForm(patient: Patient, index: number): void {
    this.currentPatientIndex = index;
    this.patientsInput.patientForm.patchValue({
      id: patient.id,
      name: patient.name,
      document: patient.cpf,
      birthDate: moment(patient.birthDate, 'YYYY-MM-DDTHH:mm:ss[Z]').format(
        'DD/MM/YYYY'
      ),
      doctor: patient.doctor,
    });
  }
}
