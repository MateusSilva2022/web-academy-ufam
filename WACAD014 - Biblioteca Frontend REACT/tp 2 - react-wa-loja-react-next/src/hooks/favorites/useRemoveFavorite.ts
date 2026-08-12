import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getStoredUser } from "@/lib/auth";
import { removeFavorite as removeFavoriteService } from "@/services/favorites.service";
import { toast } from "sonner";

interface UseRemoveFavoriteOptions {
    onSuccess?: (productId: number | string) => void;
    onError?: () => void;
}

export function useRemoveFavorite(options: UseRemoveFavoriteOptions = {}) {
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: async (productId: number | string) => {
            const user = getStoredUser();
            if (!user?.id) {
                throw new Error("AUTH_REQUIRED");
            }

            return removeFavoriteService(productId, user.id);
        },
        onMutate: () => {
            setError(null);
        },
        onSuccess: (_deleted: void, productId: number | string) => {
            toast.success("Produto removido dos favoritos");
            options.onSuccess?.(productId);
        },
        onError: (error: Error) => {
            if (error.message === "AUTH_REQUIRED") {
                setError("Faça login para gerenciar favoritos");
                toast.error("Faça login para gerenciar favoritos");
                options.onError?.();
                return;
            }

            setError("Falha ao remover favorito");
            toast.error("Falha ao remover favorito");
            options.onError?.();
        },
    });

    const removeFavorite = useCallback(
        async (productId: number | string) => mutation.mutateAsync(productId),
        [mutation]
    );

    return {
        removeFavorite,
        loading: mutation.isPending,
        error,
    };
}
