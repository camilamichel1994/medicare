import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  patients: Patient[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';
  userInput: string = '';

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

  get filteredPatients(): Patient[] {
    return this.patients.filter((patient: Patient) => {
      if (patient.doctor && patient.doctor.name) {
        return patient.doctor.name
          .toLowerCase()
          .includes(this.userInput.toLowerCase());
      }
      return false;
    });
  }
}
