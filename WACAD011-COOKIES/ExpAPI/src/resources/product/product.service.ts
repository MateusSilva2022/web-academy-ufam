import prisma from '../../lib/prisma';
import { ProductInput } from './product.types';

async function index() {
  return prisma.product.findMany({
    orderBy: { name: 'asc' }
  });
}

async function create(data: ProductInput) {
  return prisma.product.create({
    data
  });
}

async function read(id: string) {
  return prisma.product.findUnique({
    where: { id }
  });
}

async function update(id: string, data: Partial<ProductInput>) {
  return prisma.product.update({
    where: { id },
    data
  });
}

async function remove(id: string) {
  return prisma.product.delete({
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
