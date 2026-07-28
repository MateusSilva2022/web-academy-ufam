import { useCallback, useEffect, useState } from "react";
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
      setFavorites(data);
    } catch {
      setError("Falha ao carregar favoritos");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
  };
}
