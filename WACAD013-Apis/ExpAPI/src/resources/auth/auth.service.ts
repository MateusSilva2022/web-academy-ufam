import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { LoginInput } from './auth.types';

async function login(data: LoginInput) {
  const usuario = await prisma.user.findUnique({
    where: {
      email: data.email
    },
    include: {
      userType: true
    }
  });

  if (!usuario) {
    return null;
  }

  const senhaValida = await bcrypt.compare(
    data.senha,
    usuario.password.trim()
  );

  if (!senhaValida) {
    return null;
  }

  return usuario;
}

async function checkIsAdmin(uid: string) {
  const usuario = await prisma.user.findUnique({
    where: {
      id: uid
    },
    include: {
      userType: true
    }
  });

  if (!usuario) {
    return false;
  }

  return usuario.userType.label === 'admin';
}

export default {
  login,
  checkIsAdmin
};