const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
const prisma = require('../lib/prisma');
module.exports = createCrudController({ model: 'escola', validate: validators.escola, include: { cursos: true }, beforeDelete: async id => (await prisma.curso.count({ where:{ escolaId:id } })) ? null : 'Não é possível excluir escola sem cursos vinculados.' });
