import { favoriteApi } from "@/lib/api";
import { Product } from "@/types/product";

export async function getFavorites() {
  const { data } = await favoriteApi.get<Product[]>("/favorites", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  return data;
}

export async function addFavorite(dto: Product) {
  const rawProduct = dto as Product & {
    nome?: string;
    preco?: string | number;
  };

  const rawPrice = rawProduct.price ?? rawProduct.preco ?? rawProduct.preco ?? 0;
  const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
  const productName = rawProduct.name || rawProduct.nome || 'Produto sem nome';
  const finalPrice = isNaN(numericPrice) ? 0 : numericPrice;

  const payload = {
    nome: productName,
    name: productName,
    preco: finalPrice,
    price: finalPrice,
  };

  const { data } = await favoriteApi.post<Product>("/favorites", payload);
  return data;
}

export async function removeFavorite(productId: number | string) {
  await favoriteApi.delete(`/favorites/${productId}`);
}
