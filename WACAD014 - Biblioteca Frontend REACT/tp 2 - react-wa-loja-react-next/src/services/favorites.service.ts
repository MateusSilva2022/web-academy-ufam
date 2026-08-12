import { favoriteApi } from "@/lib/api";
import { Product } from "@/types/product";

export interface FavoritesPaginationParams {
  page: number;
  limit: number;
  userId: string;
}

export interface FavoritesPaginationResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getFavorites(
  params: FavoritesPaginationParams
): Promise<Product[] | FavoritesPaginationResponse> {
  const { data } = await favoriteApi.get<Product[] | FavoritesPaginationResponse>("/favorites", {
    params,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  return data;
}

export async function addFavorite(dto: Product, userId: string) {
  const rawProduct = dto as Product & {
    nome?: string;
    preco?: string | number;
  };

  const rawPrice = rawProduct.price ?? rawProduct.preco ?? 0;
  const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
  const productName = rawProduct.name || rawProduct.nome || 'Produto sem nome';
  const finalPrice = isNaN(numericPrice) ? 0 : numericPrice;
  const image = rawProduct.image || rawProduct.fotos?.[0]?.src || '/placeholder.png';

  const payload = {
    id: rawProduct.id,
    userId,
    nome: productName,
    name: productName,
    preco: finalPrice,
    price: finalPrice,
    image,
  };

  const { data } = await favoriteApi.post<Product>("/favorites", payload);
  return data;
}

export async function removeFavorite(productId: number | string, userId: string) {
  await favoriteApi.delete(`/favorites/${productId}`, {
    params: { userId },
  });
}
