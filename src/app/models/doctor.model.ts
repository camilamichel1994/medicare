export class Doctor {
  id?: string;
  name?: string;
  crm?: string;
  crmUf?: string;

  constructor(id?: string, name?: string, crm?: string, crmUf?: string) {
    this.id = id;
    this.name = name;
    this.crm = crm;
    this.crmUf = crmUf;
  }
}

export class DoctorResponse {
  success: boolean;
  data: DoctorItemResponse;
}

export class DoctorItemResponse extends Doctor {
  itens: Doctor[];
  doctor: Doctor;
}
