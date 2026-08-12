import { useCallback, useState } from "react";
import { getStoredUser } from "@/lib/auth";
import { getFavorites } from "@/services/favorites.service";
import { Product } from "@/types/product";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const user = getStoredUser();
      if (!user?.id) {
        setFavorites([]);
        return [] as Product[];
      }

      const data = await getFavorites({
        page: 1,
        limit: 100,
        userId: user.id,
      });
      const items = Array.isArray(data) ? data : data.items;
      const parsed = items as Product[];
      setFavorites(parsed);
      return parsed;
    } catch {
      setError("Falha ao carregar favoritos");
      setFavorites([]);
      return [] as Product[];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
  };
}
