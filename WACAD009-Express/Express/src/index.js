const express = require("express");
require("dotenv").config();

const app = express();

const porta = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(porta, () => {
    console.log(`Express app iniciada na porta ${porta}`);
});