import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient, PatientResponse } from '../models/patient.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  get headers() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
  }

  getPatients(): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(
      `${environment.host}/v1/mobile/patients`,
      {
        headers: this.headers,
      }
    );
  }

  insertPatient(patient: Patient) {
    return this.http.post<PatientResponse>(
      `${environment.host}/v1/mobile/patients/create`,
      patient,
      { headers: this.headers }
    );
  }

  removePatient(id: string) {
    return this.http.delete<PatientResponse>(
      `${environment.host}/v1/mobile/patients/delete/${id}`,
      { headers: this.headers }
    );
  }

  editPatient(patient: Patient) {
    return this.http.put<PatientResponse>(
      `${environment.host}/v1/mobile/patients/update/${patient.id}`,
      patient,
      { headers: this.headers }
    );
  }
}
