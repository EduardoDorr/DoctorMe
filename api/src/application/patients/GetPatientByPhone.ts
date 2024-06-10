import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { NotFoundError } from "@/infrastructure/Helpers/Errors";

export default class GetPatientByPhone {
  constructor(readonly database: DatabaseService) { }

  async execute(
    phone: string,
    includeAppointments: boolean = false,
    includeDoctor: boolean = false) {
    const patient = await this.database.getPatientByPhone(phone, includeAppointments, includeDoctor);

    if (!patient) {
      throw new NotFoundError('Patient not found')
    }

    return patient;
  }
}