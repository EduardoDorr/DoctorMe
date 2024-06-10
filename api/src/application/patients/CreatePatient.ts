import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { BusinessError } from "@/infrastructure/Helpers/Errors";
import { hashPassword } from '@/infrastructure/Helpers/SecurityHelper';

export default class CreatePatient {
  constructor(readonly database: DatabaseService) { }

  async execute(name: string, phone: string, password: string) {
    const alreadyHasPatient = await this.database.getPatientByPhone(phone);

    if (alreadyHasPatient) {
      throw new BusinessError('Patient already exist');
    }

    const hashedPassword = hashPassword(password);

    const user = await this.database.createUser(phone, hashedPassword);

    const patient = await this.database.createPatient(name, phone, user.id);

    return patient;
  }
}