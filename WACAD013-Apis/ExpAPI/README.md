# ExpAPI

API REST simples para cadastro de produtos, desenvolvida com Express, TypeScript e Prisma.

## Como executar

1. Copie `.env.example` para `.env` e ajuste a conexão com o MySQL.
2. Instale as dependências:

```bash
npm install
```

3. Gere a migration:

```bash
npx prisma migrate dev --name create-product-table
```

4. Gere o Prisma Client:

```bash
npx prisma generate
```

5. Inicie a aplicação:

```bash
npm run dev
```

A API fica disponível em `http://localhost:4455/v1/product`.
