import { favoriteApi } from "@/services/api";
import { Product } from "@/types/product";

export async function getFavorites() {
  const { data } = await favoriteApi.get<Product[]>("/favoritos", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  return data;
}

export async function addFavorite(dto: Product) {
  const rawPrice = dto.preco ?? dto.price ?? 0;
  const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
  const productName = dto.nome || dto.name || 'Produto sem nome';
  const finalPrice = isNaN(numericPrice) ? 0 : numericPrice;

  const payload = {
    nome: productName,
    name: productName,
    preco: finalPrice,
    price: finalPrice,
  };

  const { data } = await favoriteApi.post<Product>("/favoritos", payload);
  return data;
}

export async function removeFavorite(productId: number | string) {
  await favoriteApi.delete(`/favoritos/${productId}`);
}