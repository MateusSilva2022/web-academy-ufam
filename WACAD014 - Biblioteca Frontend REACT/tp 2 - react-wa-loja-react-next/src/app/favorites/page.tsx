'use client';

import CartList from "@/components/CartList";
import Navbar from "@/components/Navbar";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import { useRemoveFavorite } from "@/hooks/favorites/useRemoveFavorite";
import { useState } from "react";


export default function FavoritesPage() {
    const [loading, setLoading] = useState(false);
    const { favorites, fetchFavorites } = useFavorites();
    const { removeFavorite } = useRemoveFavorite();

    if (loading) {
        return (
            <>
                <Navbar />
                <main>
                    <div className="container p-5">
                        <p>Carregando...</p>
                    </div>
                </main>
            </>
        );
    }


    async function handleRemoveFavorite(productId: number) {
        setLoading(true);
        await removeFavorite(productId);
        await fetchFavorites();
        setLoading(false);
    }

    return (<>
        <Navbar />

        <main>
            <div className="container p-5">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-4 fw-light">
                            Produtos Favoritos
                        </h5>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Valor Unitário</th>
                                        <th>Quantidade</th>
                                        <th>Valor Total</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>

                                <CartList
                                    items={favorites}
                                    removeItemFromCart={handleRemoveFavorite}
                                />
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    </>);
}
