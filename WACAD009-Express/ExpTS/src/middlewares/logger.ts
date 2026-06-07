import {
    Request,
    Response,
    NextFunction
} from "express";

import fs from "fs";
import path from "path";

export function logger(
    pastaLogs: string,
    formato: string
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!fs.existsSync(pastaLogs)) {
            fs.mkdirSync(
                pastaLogs,
                { recursive: true }
            );
        }

        const arquivo = path.join(
            pastaLogs,
            "access.log"
        );

        const horario =
            new Date().toLocaleString();

        let mensagem = "";

        if (formato === "completo") {

            mensagem =
                `[${horario}] ${req.method} ${req.url} HTTP/${req.httpVersion} | ${req.headers["user-agent"]}\n`;

        } else {

            mensagem =
                `[${horario}] ${req.method} ${req.url}\n`;

        }

        fs.appendFileSync(
            arquivo,
            mensagem
        );

        next();
    };
}