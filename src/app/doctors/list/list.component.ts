import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'doctors-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild(InputComponent) doctorsInput: InputComponent;

  doctors: Doctor[] = [];
  currentDoctorIndex: number;
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private doctorService: DoctorService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.navigation.show();
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe((res) => {
      this.doctors = res.data.itens;
      this.isLoading = false;
    });
  }

  registerDoctor(doctor: Doctor): void {
    this.isLoading = true;
    this.doctorService.insertDoctor(doctor).subscribe(
      (res) => {
        doctor.id = res.data.id;
        this.doctors.push(doctor);
        this.isLoading = false;
      },
      ({ status, statusText }) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = `Erro ao gravar: ${status} - ${statusText}`;
      }
    );
  }

  updateDoctor(doctor: Doctor): void {
    this.isLoading = true;
    this.doctorService.editDoctor(doctor).subscribe(
      () => {
        this.doctors[this.currentDoctorIndex] = doctor;
        this.isLoading = false;
      },
      ({ status, statusText }) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = `Erro ao atualizar: ${status} - ${statusText}`;
      }
    );
  }

  removeDoctor(doctor: Doctor, index: number): void {
    if (doctor.id) {
      this.isLoading = true;
      this.doctorService.removeDoctor(doctor.id).subscribe(
        () => {
          this.doctors.splice(index, 1);
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

  populateDoctorForm(doctor: Doctor, index: number): void {
    this.currentDoctorIndex = index;
    this.doctorsInput.doctorForm.patchValue({
      id: doctor.id,
      name: doctor.name,
      document: doctor.crm,
      documentState: doctor.crmUf,
    });
  }
}
