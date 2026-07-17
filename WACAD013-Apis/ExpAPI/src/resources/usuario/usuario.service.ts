import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { UsuarioInput } from './usuario.types';

async function index() {
  return prisma.user.findMany({
    include: {
      userType: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

async function create(data: UsuarioInput) {
  const senhaCriptografada = await bcrypt.hash(data.senha, 10);

  return prisma.user.create({
    data: {
      userTypeId: data.tipoUsuarioId,
      name: data.nome,
      email: data.email,
      password: senhaCriptografada
    }
  });
}

async function read(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      userType: true
    }
  });
}

async function update(id: string, data: Partial<UsuarioInput>) {
  const updateData: Partial<{
    userTypeId: string;
    name: string;
    email: string;
    password: string;
  }> = {};

  if (data.tipoUsuarioId) updateData.userTypeId = data.tipoUsuarioId;
  if (data.nome) updateData.name = data.nome;
  if (data.email) updateData.email = data.email;

  if (data.senha) {
    updateData.password = await bcrypt.hash(data.senha, 10);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    include: {
      userType: true
    }
  });
}

async function remove(id: string) {
  return prisma.user.delete({
    where: { id }
  });
}

export default {
  index,
  create,
  read,
  update,
  remove
};