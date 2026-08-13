import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API da Loja virtual',
    description: 'Documentação da API da Loja virtual implementada durante o Web Academy.',
    version: '1.0.0',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  tags: [
    { name: 'Auth', description: 'Rotas de autenticação' },
    { name: 'Produto', description: 'Rotas de produtos' },
  ],
  paths: {
    '/v1/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Registro de novos clientes.',
      },
    },
    '/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login de usuários.',
      },
    },
    '/v1/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout de usuário logado.',
      },
    },
    '/v1/product': {
      get: {
        tags: ['Produto'],
        summary: 'Listagem de produtos.',
      },
      post: {
        tags: ['Produto'],
        summary: 'Adiciona um novo produto na base.',
      },
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);