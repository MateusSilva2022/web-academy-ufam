import { PrismaClient } from '@prisma/client';
import { UserTypes } from '../src/resources/userType/userType.constants';

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.upsert({
    where: {
      id: UserTypes.ADMIN,
    },
    update: {},
    create: {
      id: UserTypes.ADMIN,
      label: 'admin',
    },
  });

  await prisma.userType.upsert({
    where: {
      id: UserTypes.CLIENT,
    },
    update: {},
    create: {
      id: UserTypes.CLIENT,
      label: 'client',
    },
  });

  console.log('Tipos de usuários criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });