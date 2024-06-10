import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { NotFoundError } from "@/infrastructure/Helpers/Errors";

export default class GetPatientById {
  constructor(readonly database: DatabaseService) { }

  async execute(id: number, includeAppointment : boolean = false) {
    const patient = await this.database.getPatientById(id, includeAppointment);

    if (!patient) {
      throw new NotFoundError('Patient not found')
    }

    return patient;
  }
}