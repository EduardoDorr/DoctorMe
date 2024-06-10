import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { NotFoundError } from "@/infrastructure/Helpers/Errors";

export default class GetDoctorById {
  constructor(readonly database: DatabaseService) { }

  async execute(id: number, includeAgenda : boolean = false) {
    const doctor = await this.database.getDoctorById(id, includeAgenda);

    if (!doctor) {
      throw new NotFoundError('Doctor not found')
    }

    return doctor;
  }
}