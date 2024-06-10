import IPatientsController from '@/application/controllers/IPatientsController';
import AuthenticatePatient from '@/application/patients/AuthenticatePatient';
import CreateAppointment from '@/application/patients/CreateAppointment';
import CreatePatient from '@/application/patients/CreatePatient';
import GetPatientById from '@/application/patients/GetPatientById';
import GetPatientByPhone from '@/application/patients/GetPatientByPhone';
import { database } from '@/infrastructure/Database/DatabaseService';
import { Request, Response } from 'express';

export default class PatientsController implements IPatientsController {
  async authenticate(req: Request, res: Response): Promise<void> {
    const { phone, password } = req.body;
    const command = new AuthenticatePatient(database);
    const patient = await command.execute(phone, password);

    res.status(200).json(patient);
  }

  async createPatient(req: Request, res: Response): Promise<void> {
    const { name, phone, password } = req.body;

    const command = new CreatePatient(database);

    const patient = await command.execute(name, phone, password);

    res.status(201).json(patient);
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    const { agendaId } = req.body;
    const { id } = req.params;

    const command = new CreateAppointment(database);

    const appointment =
      await command.execute(
        Number(id),
        Number(agendaId));

    res.status(201).json(appointment);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const command = new GetPatientById(database);

    const patient =
      await command.execute(Number(id));

    res.status(200).json(patient);
  }

  async getByPhone(req: Request, res: Response): Promise<void> {
    const { phone } = req.params;
    const { includeAppointments, includeDoctor } = req.query;

    const command = new GetPatientByPhone(database);

    const patient =
      await command.execute(phone, Boolean(includeAppointments), Boolean(includeDoctor));

    res.status(200).json(patient);
  }
}