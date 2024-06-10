import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  constructor(readonly connection: PrismaClient) {

  }

  async getAllDoctors() {
    return await this.connection.doctor.findMany({
      include: {
        agenda: true
      }
    });
  }

  async getDoctorById(id: number, includeAgenda: boolean = false) {
    return await this.connection.doctor.findUnique({
      where: { id },
      include: {
        agenda: includeAgenda
      }
    });
  }

  async getPatientById(id: number, includeAppointments: boolean = false) {
    return await this.connection.patient.findUnique({
      where: { id },
      include: {
        Appoitment: includeAppointments
      }
    });
  }

  async getPatientByPhone(
    phone: string,
    includeAppointments: boolean = false,
    includeDoctor: boolean = false) {
    return await this.connection.patient.findUnique({
      where: { phone },
      include: {
        Appoitment: !includeAppointments
        ? false
        : {
          include: {
            doctor: includeDoctor
          }
        }
      }
    });
  }

  async createUser(phone: string, password: string) {
    return this.connection.user.create({
      data: {
        phone,
        password
      }
    });
  }

  async getUserByPhone(phone: string) {
    return await this.connection.user.findUnique({
      where: { phone }
    });
  }

  async createPatient(name: string, phone: string, userId: number) {
    return this.connection.patient.create({
      data: {
        name,
        phone,
        userId
      }
    });
  }

  async createAppointment(patientId: number, doctorId: number, date: Date) {
    return this.connection.appoitment.create({
      data: {
        patientId,
        doctorId,
        date
      }
    });
  }

  async getAgendaById(id: number) {
    return await this.connection.agenda.findUnique({
      where: { id }
    });
  }

  async updateAgenda(id: number, data: { available: boolean }) {
    return await this.connection.agenda.update({
      where: { id },
      data
    });
  }
}

export const database = new DatabaseService(new PrismaClient);