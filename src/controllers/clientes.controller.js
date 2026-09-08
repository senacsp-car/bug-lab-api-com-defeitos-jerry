const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
const prisma = require('../lib/prisma');
module.exports = createCrudController({ model: 'cliente', validate: validators.cliente, include: { compras: true }, beforeDelete: async id => (await prisma.compra.count({ where:{ clienteId:id } })) ? null : 'Não é possível excluir cliente sem compras vinculadas.' });
