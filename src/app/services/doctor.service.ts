import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor, DoctorResponse } from '../models/doctor.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  get headers() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
  }

  getDoctors(): Observable<DoctorResponse> {
    return this.http.get<DoctorResponse>(
      `${environment.host}/v1/mobile/doctors`,
      {
        headers: this.headers,
      }
    );
  }

  insertDoctor(doctor: Doctor) {
    return this.http.post<DoctorResponse>(
      `${environment.host}/v1/mobile/doctors/create`,
      doctor,
      { headers: this.headers }
    );
  }

  removeDoctor(id: string) {
    return this.http.delete<DoctorResponse>(
      `${environment.host}/v1/mobile/doctors/delete/${id}`,
      { headers: this.headers }
    );
  }

  editDoctor(doctor: Doctor) {
    return this.http.put<DoctorResponse>(
      `${environment.host}/v1/mobile/doctors/update/${doctor.id}`,
      doctor,
      { headers: this.headers }
    );
  }
}
