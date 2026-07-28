const jsonServer = require("json-server");

const server = jsonServer.create();

const fs = require("fs");
const path = require("path");
const FAVORITES_KEY = "favorites";
const LEGACY_FAVORITES_KEY = "favoritos";
const filePath = path.join(__dirname, "db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);

if (!Array.isArray(db[FAVORITES_KEY])) {
    db[FAVORITES_KEY] = Array.isArray(db[LEGACY_FAVORITES_KEY])
        ? db[LEGACY_FAVORITES_KEY]
        : [];
}

const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.get("/api/favorites", (req, res) => {
    const favorites = router.db.get(FAVORITES_KEY).value() || [];
    return res.status(200).json(favorites);
});

server.post("/api/favorites", (req, res) => {
    const newFavorite = req.body;

    if (!newFavorite || typeof newFavorite !== "object") {
        return res.status(400).json({ error: "Favorito inválido" });
    }

    if (!newFavorite.id) {
        newFavorite.id = Date.now().toString();
    }

    const favorites = router.db.get(FAVORITES_KEY).value() || [];
    const duplicated = favorites.some(
        (item) => String(item.id) === String(newFavorite.id)
    );

    if (duplicated) {
        return res.status(409).json({ error: "Favorito já adicionado!" });
    }

    router.db.set(FAVORITES_KEY, [...favorites, newFavorite]).write();
    return res.status(201).json(newFavorite);
});

server.delete("/api/favorites/:id", (req, res) => {
    const { id } = req.params;
    const favorite = (router.db.get(FAVORITES_KEY).value() || []).find(
        (item) => String(item.id) === String(id)
    );

    if (!favorite) {
        return res.status(404).json({ error: "Favorito não encontrado." });
    }

    const updatedFavorites = (router.db.get(FAVORITES_KEY).value() || []).filter(
        (item) => String(item.id) !== String(id)
    );
    router.db.set(FAVORITES_KEY, updatedFavorites).write();
    return res.status(204).send();
});

server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
    })
);
server.use(router);
server.listen(4000, () => {
    console.log("JSON Favorites API is running in http://localhost:4000");
});

module.exports = server;
