import { Router } from "express";

import { MainController } from "../controllers/MainController";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();

const controller =
    new MainController();

const produtoController =
    new ProdutoController();

router.get(
    "/",
    controller.home
);

router.get(
    "/lorem/:qtd",
    controller.lorem
);

router.get(
    "/hb1",
    controller.hb1
);

router.get(
    "/hb2",
    controller.hb2
);

router.get(
    "/hb3",
    controller.hb3
);

router.get(
    "/hb4",
    controller.hb4
);

router.get(
    "/produto",
    produtoController.listar
);

export default router;