import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const specialities = [
  "Cardiologista",
  "Endocrinologista",
  "Dentista",
  "Clinico Geral",
  "Pediatra",
  "Urologista",
  "Otorrinolaringologista"
];

function createDoctor() {
  const speciality = specialities[Math.floor(Math.random()) * specialities.length];
  const experience = `${Math.floor(Math.random() * 5) + 1} anos`;

  const doctor = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    state: faker.location.state(),
    speciality: speciality,
    bio: `Formado em ${speciality} com ${experience} de experiência`,
    picture: `photo-${Math.floor(Math.random() * 9) + 1}`,
    price: Number(faker.commerce.price({ min: 100, max: 1000 })),
    avaialability: "Seg to Sex das 10:00 às 16:00",
    experience: experience,
    attendances: Math.floor(Math.random() * 10),
    address: faker.location.streetAddress()
  };

  return doctor;
}

function generateAgenda() {
  const dates = [
    "2024-06-08 19:00:00",
    "2024-06-09 19:00:00",
    "2024-06-10 19:00:00",
    "2024-06-11 19:00:00",
    "2024-06-12 19:00:00"
  ];

  return dates;
}

async function main() {
  console.log("Seed stating...");

  const QUANTITY_ITEMS = 10;

  for (let index = 0; index < QUANTITY_ITEMS; index++) {
    const doctor = createDoctor();
    const agenda = generateAgenda();
    
    await prisma.doctor.create({
      data: {
        ...doctor,
        agenda: {
          createMany: {
            data: agenda.map((item) => ({
              date: new Date(item).toISOString()
            }))
          }
        }
      }
    });
  }

  console.log("Seed finishing...");
}

main();