import {
    Request,
    Response
} from "express";

import { Produto } from "../models/Produto";

export class ProdutoController {

    listar(
        req: Request,
        res: Response
    ): void {

        const produtos: Produto[] = [

            {
                id: 1,
                nome: "Celular Samsung Galaxy S23",
                preco: 3000
            },

            {
                id: 2,
                nome: "Tablet Samsung Galaxy Tab",
                preco: 4000
            },

            {
                id: 3,
                nome: "Monitor Dell DMD34",
                preco: 2550
            },

            {
                id: 4,
                nome: "Ar-condicionado Split Samsung",
                preco: 3000
            }
        ];

        res.render(
            "produto/lista",
            {
                produtos
            }
        );
    }
}