import DatabaseService, { database } from '@/infrastructure/Database/DatabaseService'
import { BusinessError, NotFoundError, UnauthorizedError } from '@/infrastructure/Helpers/Errors';
import { comparePassword, encodeToBase64 } from '@/infrastructure/Helpers/SecurityHelper';

export default class AuthenticatePatient {
  constructor(readonly database: DatabaseService) { }

  async execute(phone: string, password: string) {
    const patient = await database.getUserByPhone(phone);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    const isPasswordValid = comparePassword(password, patient.password);

    if (!isPasswordValid) {
      throw new BusinessError('Phone or Password is invalid');
    }

    const payload = {
      user: {
        id: patient.id,
        phone: patient.phone
      }
    }

    return {
      phone: patient.phone,
      token: encodeToBase64(JSON.stringify(payload))
    }
  }
}