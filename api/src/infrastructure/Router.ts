import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import IDoctorsController from "@/application/controllers/IDoctorsController";
import IPatientsController from "@/application/controllers/IPatientsController";
import { validateBody, validateParams, isAuthenticated } from "./Middlewares/ValidationMiddleware";
import { authenticationSchema } from "./Validators/AuthenticationSchemas";
import { agendaIdSchema, createPatientSchema, patientIdSchema, patientPhoneSchema } from "./Validators/PatientSchemas";
import { DoctorIdSchema } from "./Validators/DoctorSchemas";
import { errorHandlingMiddleware as errorHandlingMiddleware } from "./Middlewares/ErrorHandlingMiddleware";

export default class Router {
  app: express.Express

  constructor(
    readonly doctorsController: IDoctorsController,
    readonly patientsController: IPatientsController
  ) {
    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    
    this.setRoutes();

    this.app.use(errorHandlingMiddleware);
  }

  private setRoutes() {
    this.app.get("/", (req, res) => {
      res.send("I'm alive");
    })

    this.app.post(
      "/authenticate",
      validateBody(authenticationSchema),
      this.patientsController.authenticate);

    this.app.get("/doctors", this.doctorsController.getAll);

    this.app.get(
      "/doctors/:id",
      validateParams(DoctorIdSchema),
      this.doctorsController.getById);

    this.app.post(
      "/patients",
      validateBody(createPatientSchema),
      this.patientsController.createPatient);

    // this.app.get(
    //   "/patients/:patientId",
    //   validateParams(patientIdSchema),
    //   this.patientsController.getById);

    this.app.get(
      "/patients/:phone",
      isAuthenticated,
      validateParams(patientPhoneSchema),
      this.patientsController.getByPhone);

    this.app.post(
      "/patients/:id/appointments",
      isAuthenticated,
      validateBody(agendaIdSchema),
      validateParams(patientIdSchema),
      this.patientsController.createAppointment);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  }
}