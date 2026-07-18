import prisma from '../../lib/prisma';
import { CompraItemInput } from './compra.types';

async function addItem(
  carrinho: CompraItemInput[],
  item: CompraItemInput
) {
  const existente = carrinho.find(
    (p) => p.productId === item.productId
  );

  if (existente) {
    existente.quantity += item.quantity;
  } else {
    carrinho.push(item);
  }

  return carrinho;
}

async function checkout(
  uid: string,
  carrinho: CompraItemInput[]
) {
  console.log('========== CHECKOUT ==========');
  console.log('UID:', uid);
  console.log('Carrinho:', JSON.stringify(carrinho, null, 2));

  const compra = await prisma.purchase.create({
    data: {
      userId: uid
    }
  });

  console.log('Compra criada:', compra);

  for (const item of carrinho) {
    console.log('-----------------------------');
    console.log('Item:', item);

    const produto = await prisma.product.findUnique({
      where: {
        id: item.productId
      }
    });

    console.log('Produto encontrado:', produto);

    await prisma.purchaseItem.create({
      data: {
        purchaseId: compra.id,
        productId: item.productId,
        quantity: item.quantity
      }
    });

    console.log('PurchaseItem criado.');
  }

  console.log('========== FIM CHECKOUT ==========');

  return compra;
}

export default {
  addItem,
  checkout
};