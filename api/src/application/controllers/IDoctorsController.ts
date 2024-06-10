import { Request, Response } from 'express'

export default interface IDoctorsController {
  getAll(req: Request, res: Response) : Promise<void>;
  getById(req: Request, res: Response) : Promise<void>;
}