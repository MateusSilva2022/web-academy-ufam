import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addFavorite as addFavoriteService } from "@/services/favorites.service";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface UseAddFavoriteOptions {
    onSuccess?: (created: Product) => void;
    onError?: () => void;
}

export function useAddFavorite(options: UseAddFavoriteOptions = {}) {
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: addFavoriteService,
        onMutate: () => {
            setError(null);
        },
        onSuccess: (created) => {
            toast.success("Produto adicionado aos favoritos");
            options.onSuccess?.(created);
        },
        onError: () => {
            toast.error("Falha ao adicionar favorito");
            options.onError?.();
        },
    });

    const addFavorite = useCallback(
        async (product: Product) => mutation.mutateAsync(product),
        [mutation]
    );

    return {
        addFavorite,
        loading: mutation.isPending,
        isAddingFavorite: mutation.isPending,
    };
}
