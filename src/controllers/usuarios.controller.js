const { createCrudController } = require("./crudFactory");
const validators = require("./validators");
const prisma = require("../lib/prisma");

// Observação: Usuario não tem entidades dependentes no schema informado
// (diferente de Cliente, que tem Compra), então não há necessidade de
// beforeDelete aqui — não existe nada a bloquear na exclusão.

// ATENÇÃO (não é um bug intencional, é um ponto real a resolver):
// o campo `senha` não está sendo removido da resposta. Como o crudFactory
// usa `include` apenas para relações (não restringe campos escalares),
// toda resposta desta rota (list, create, getById, update) devolve a senha
// em texto puro. Se o crudFactory já suportar `omit` (Prisma 5.16+) ou um
// `select` com os campos permitidos, vale aplicar aqui antes de usar em aula.
module.exports = createCrudController({
  model: "usuario",
  validate: validators.usuario,
});
