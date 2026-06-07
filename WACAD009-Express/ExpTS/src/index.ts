import express from "express";
import dotenv from "dotenv";
import path from "path";
import { engine } from "express-handlebars";

import { validateEnv } from "./utils/validateEnv";
import { logger } from "./middlewares/logger";
import routes from "./routes/routes";

dotenv.config();

const env = validateEnv();

const app = express();

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
            __dirname,
            "views/layouts"
        ),
        helpers: {
            isNode: function (tecnologias: any[]) {
                return tecnologias.filter(
                    (tecnologia: any) =>
                        tecnologia.poweredByNodejs
                );
            }
        }
    })
);

app.set(
    "view engine",
    "hbs"
);

app.set(
    "views",
    path.join(
        __dirname,
        "views"
    )
);

app.use(
    logger(
        env.LOG_DIR,
        env.LOG_FORMAT
    )
);

app.use(routes);

app.listen(
    env.PORT,
    () => {
        console.log(
            `Express app iniciada na porta ${env.PORT}`
        );
    }
);