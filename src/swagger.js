'use strict';
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API Didática Prisma',
      version: '1.0.0',
      description:
        'API REST didática para testes caixa-preta via Postman. ' +
        'Possui 4 domínios independentes: **Loja**, **Restaurante**, **Escola** e **Clientes**.',
      contact: { name: 'Equipe Didática' },
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    tags: [
      { name: 'Health',     description: 'Verificação de saúde da API' },
      { name: 'Categorias', description: 'Domínio Loja — categorias de produtos' },
      { name: 'Produtos',   description: 'Domínio Loja — produtos vinculados a uma categoria' },
      { name: 'Pratos',     description: 'Domínio Restaurante — pratos do cardápio' },
      { name: 'Reservas',   description: 'Domínio Restaurante — reservas de mesas' },
      { name: 'Escolas',    description: 'Domínio Escola — escolas' },
      { name: 'Cursos',     description: 'Domínio Escola — cursos vinculados a uma escola' },
      { name: 'Clientes',   description: 'Domínio Clientes — clientes cadastrados' },
      { name: 'Compras',    description: 'Domínio Clientes — compras vinculadas a um cliente' },
    ],
    components: {
      // Schemas de erro reutilizáveis em todas as rotas
      schemas: {
        ErroValidacao: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Mensagem descritiva do erro.' } },
        },
        ErroNotFound: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Registro não encontrado.' } },
        },
      },
      // Parâmetros de rota/query compartilhados entre todos os recursos
      parameters: {
        idParam: {
          in: 'path', name: 'id', required: true,
          schema: { type: 'integer', minimum: 1 },
          description: 'ID inteiro positivo do registro',
        },
        skipParam: {
          in: 'query', name: 'skip', required: false,
          schema: { type: 'integer', minimum: 0, default: 0 },
          description: 'Registros a pular (paginação)',
        },
        takeParam: {
          in: 'query', name: 'take', required: false,
          schema: { type: 'integer', minimum: 1, maximum: 100, default: 100 },
          description: 'Registros a retornar — máx. 100',
        },
      },
      // Respostas padrão reutilizáveis
      responses: {
        BadRequest: {
          description: 'Dados inválidos na requisição',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroValidacao' } } },
        },
        NotFound: {
          description: 'Registro não encontrado',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroNotFound' } } },
        },
        NoContent: { description: 'Operação realizada com sucesso (sem conteúdo)' },
      },
    },
  },
  // Schemas de domínio e docs de endpoints ficam nos próprios arquivos de rotas
  apis: ['./src/app.js', './src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
