import { Request, Response } from 'express'

export default interface IPatientsController {
  authenticate(req: Request, res: Response) : Promise<void>;
  createPatient(req: Request, res: Response) : Promise<void>;
  createAppointment(req: Request, res: Response) : Promise<void>;
  getById(req: Request, res: Response) : Promise<void>;
  getByPhone(req: Request, res: Response) : Promise<void>;
}