import { api } from "@/lib/api";
import { Product } from "@/types/product";


export async function getFavorites() {
    const { data } = await api.get<Product[]>("/favorites", {
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
    });
    return data;
}

export async function addFavorite(dto: Product) {
    const { data } = await api.post<Product>("/favorites", dto);
    return data;
}

export async function removeFavorite(productId: number) {
    await api.delete(`/favorites/${productId}`);
}
