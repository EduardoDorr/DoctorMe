import DatabaseService from "@/infrastructure/Database/DatabaseService";
import { BusinessError, NotFoundError } from "@/infrastructure/Helpers/Errors";

export default class CreateAppointment {
  constructor(readonly database: DatabaseService) { }

  async execute(patientId: number, agendaId: number) {    
    const patient = await this.database.getPatientById(patientId);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    const agenda = await this.database.getAgendaById(agendaId);

    if (!agenda) {
      throw new NotFoundError('Agenda not found');
    }

    if (!agenda.available) {
      throw new BusinessError('Agenda is not available to this date');
    }

    await this.database.updateAgenda(agenda.id, { available: false });

    const appointment = await this.database.createAppointment(patient.id, agenda.doctorId, agenda.date);

    return appointment;
  }
}