import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite as addFavoriteService } from "@/services/favorites.service";
import { getStoredUser } from "@/lib/auth";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface UseAddFavoriteOptions {
    onSuccess?: (created: Product) => void;
    onError?: () => void;
}

export function useAddFavorite(options: UseAddFavoriteOptions = {}) {
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (product: Product) => {
            const user = getStoredUser();
            if (!user?.id) {
                throw new Error("AUTH_REQUIRED");
            }

            return addFavoriteService(product, user.id);
        },
        onMutate: () => {
            setError(null);
        },
        onSuccess: (created) => {
            toast.success("Produto adicionado aos favoritos");
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            options.onSuccess?.(created);
        },
        onError: (error: Error) => {
            if (error.message === "AUTH_REQUIRED") {
                setError("Faça login para favoritar produtos");
                toast.error("Faça login para favoritar produtos");
                options.onError?.();
                return;
            }

            setError("Falha ao adicionar favorito");
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
        error,
    };
}
