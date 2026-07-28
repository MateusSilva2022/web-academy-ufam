import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { removeFavorite as removeFavoriteService } from "@/services/favorites.service";
import { toast } from "sonner";

interface UseRemoveFavoriteOptions {
    onSuccess?: (productId: number) => void;
    onError?: () => void;
}

export function useRemoveFavorite(options: UseRemoveFavoriteOptions = {}) {
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: removeFavoriteService,
        onMutate: () => {
            setError(null);
        },
        onSuccess: (_:any, productId:number) => {
            toast.success("Produto removido dos favoritos");
            options.onSuccess?.(productId);
        },
        onError: () => {
            toast.error("Falha ao remover favorito");
            options.onError?.();
        },
    });

    const removeFavorite = useCallback(
        async (productId: number) => mutation.mutateAsync(productId),
        [mutation]
    );

    return {
        removeFavorite,
        loading: mutation.isPending,
    };
}
