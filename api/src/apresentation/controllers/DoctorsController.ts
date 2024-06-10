import IDoctorsController from '@/application/controllers/IDoctorsController';
import GetAllDoctors from '@/application/doctors/GetAllDoctors';
import GetDoctorById from '@/application/doctors/GetDoctorById';
import { Request, Response } from 'express';
import { database } from '@/infrastructure/Database/DatabaseService';

export default class DoctorsController implements IDoctorsController {
  async getAll(req: Request, res: Response): Promise<void> {
    const command = new GetAllDoctors(database);

    const doctors = await command.execute();

    res.status(200).json(doctors);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { doctorId } = req.params;

    const command = new GetDoctorById(database);

    const doctors = await command.execute(Number(doctorId));

    res.status(200).json(doctors);
  }
}