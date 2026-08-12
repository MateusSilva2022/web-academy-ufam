import { useCallback, useState } from "react";
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
      const data = await getFavorites();
      const parsed = data as Product[];
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
