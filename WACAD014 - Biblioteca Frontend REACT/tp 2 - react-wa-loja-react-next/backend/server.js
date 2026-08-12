/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require("json-server");

const server = jsonServer.create();

const fs = require("fs");
const path = require("path");
const FAVORITES_KEY = "favorites";
const LEGACY_FAVORITES_KEY = "favoritos";
const USERS_KEY = "users";
const filePath = path.join(__dirname, "db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);

if (!Array.isArray(db[FAVORITES_KEY])) {
    db[FAVORITES_KEY] = Array.isArray(db[LEGACY_FAVORITES_KEY])
        ? db[LEGACY_FAVORITES_KEY]
        : [];
}

if (!Array.isArray(db[USERS_KEY])) {
    db[USERS_KEY] = [];
}

const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.get("/api/favorites", (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const favorites = (router.db.get(FAVORITES_KEY).value() || []).filter(
        (item) => String(item.userId) === String(userId)
    );
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if (!Number.isNaN(page) && !Number.isNaN(limit) && page > 0 && limit > 0) {
        const total = favorites.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return res.status(200).json({
            items: favorites.slice(startIndex, endIndex),
            total,
            page,
            limit,
            totalPages,
        });
    }

    return res.status(200).json(favorites);
});

server.post("/api/favorites", (req, res) => {
    const newFavorite = req.body;

    if (!newFavorite || typeof newFavorite !== "object") {
        return res.status(400).json({ error: "Favorito inválido" });
    }

    if (!newFavorite.userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!newFavorite.id) {
        newFavorite.id = Date.now().toString();
    }

    const favorites = router.db.get(FAVORITES_KEY).value() || [];
    const duplicated = favorites.some(
        (item) =>
            String(item.id) === String(newFavorite.id) &&
            String(item.userId) === String(newFavorite.userId)
    );

    if (duplicated) {
        return res.status(409).json({ error: "Favorito já adicionado!" });
    }

    router.db.set(FAVORITES_KEY, [...favorites, newFavorite]).write();
    return res.status(201).json(newFavorite);
});

server.delete("/api/favorites/:id", (req, res) => {
    const { id } = req.params;
    const userId = req.query.userId;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const favorite = (router.db.get(FAVORITES_KEY).value() || []).find(
        (item) =>
            String(item.id) === String(id) &&
            String(item.userId) === String(userId)
    );

    if (!favorite) {
        return res.status(404).json({ error: "Favorito não encontrado." });
    }

    const updatedFavorites = (router.db.get(FAVORITES_KEY).value() || []).filter(
        (item) =>
            !(String(item.id) === String(id) && String(item.userId) === String(userId))
    );
    router.db.set(FAVORITES_KEY, updatedFavorites).write();
    return res.status(204).send();
});

server.post("/api/register", (req, res) => {
    const { nome, email, senha } = req.body || {};

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Dados de cadastro inválidos." });
    }

    const users = router.db.get(USERS_KEY).value() || [];
    const existingUser = users.find(
        (user) => String(user.email).toLowerCase() === String(email).toLowerCase()
    );

    if (existingUser) {
        return res.status(409).json({ error: "E-mail já cadastrado." });
    }

    const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
    };

    router.db.set(USERS_KEY, [...users, newUser]).write();

    return res.status(201).json({
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
    });
});

server.post("/api/login", (req, res) => {
    const { email, senha } = req.body || {};

    if (!email || !senha) {
        return res.status(400).json({ error: "Credenciais inválidas." });
    }

    const users = router.db.get(USERS_KEY).value() || [];
    const user = users.find(
        (item) =>
            String(item.email).toLowerCase() === String(email).toLowerCase() &&
            String(item.senha) === String(senha)
    );

    if (!user) {
        return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    return res.status(200).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
    });
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
