import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { NotFoundError } from "@/infrastructure/Helpers/Errors";

export default class GetAllDoctors {
  constructor(readonly database: DatabaseService) {

  }
  
  async execute() {
    const doctors = await this.database.getAllDoctors();

    if (!doctors) {
      throw new NotFoundError('Doctors not found')
    }

    return doctors;
  }
}