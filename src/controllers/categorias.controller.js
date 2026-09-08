const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
const prisma = require('../lib/prisma');
module.exports = createCrudController({ model: 'categoria', validate: validators.categoria, include: { produtos: true }, beforeDelete: async id => (await prisma.produto.count({ where:{ categoriaId:id } })) ? 'Não é possível excluir categoria com produtos vinculados.' : null });
