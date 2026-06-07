import {
    Request,
    Response
} from "express";

import { LoremIpsum } from "lorem-ipsum";

export class MainController {

    home(
        req: Request,
        res: Response
    ): void {

        res.send("Hello World!");
    }

    lorem(
        req: Request,
        res: Response
    ): void {

        const qtd = Number(
            req.params.qtd
        );

        const lorem =
            new LoremIpsum();

        res.send(
            lorem.generateParagraphs(
                qtd
            )
        );
    }

    hb1(
        req: Request,
        res: Response
    ): void {

        res.render("hb1");
    }

    hb2(
        req: Request,
        res: Response
    ): void {

        res.render(
            "hb2",
            {
                titulo:
                    "Express Framework"
            }
        );
    }

    hb3(
        req: Request,
        res: Response
    ): void {

        const professores = [
            "David Fernandes",
            "Horácio Fernandes",
            "Edleno Moura",
            "Elaine Harada"
        ];

        res.render(
            "hb3",
            {
                professores
            }
        );
    }

    hb4(
        req: Request,
        res: Response
    ): void {

        const tecnologias = [

            {
                name: "Express",
                type: "Framework",
                poweredByNodejs: true
            },
            {
                name: "Laravel",
                type: "Framework",
                poweredByNodejs: false
            },
            {
                name: "React",
                type: "Library",
                poweredByNodejs: true
            },
            {
                name: "Handlebars",
                type: "Engine View",
                poweredByNodejs: true
            },
            {
                name: "Django",
                type: "Framework",
                poweredByNodejs: false
            },
            {
                name: "Docker",
                type: "Virtualization",
                poweredByNodejs: false
            },
            {
                name: "Sequelize",
                type: "ORM tool",
                poweredByNodejs: true
            }
        ];

        res.render(
            "hb4",
            {
                tecnologias
            }
        );
    }
}