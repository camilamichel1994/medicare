import { Doctor } from './doctor.model';

export class Patient {
  id?: string;
  name?: string;
  birthDate?: string;
  cpf?: string;
  doctor?: Doctor;
  doctorId?: string;

  constructor(
    id?: string,
    name?: string,
    birthDate?: string,
    cpf?: string,
    doctor?: Doctor,
    doctorId?: string
  ) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.doctor = doctor;
    this.doctorId = doctorId;
  }
}

export class PatientResponse {
  data: PatientItensResponse;
  success: boolean;
}

export class PatientItensResponse extends Patient {
  itens: Patient[];
  patient: Patient;
}
