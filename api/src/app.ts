import Router from '@/infrastructure/Router'
import DoctorsController from './apresentation/controllers/DoctorsController';
import PatientsController from './apresentation/controllers/PatientsController';

const doctorsController = new DoctorsController();
const patientsController = new PatientsController();

const app = new Router(doctorsController, patientsController);

export default app;