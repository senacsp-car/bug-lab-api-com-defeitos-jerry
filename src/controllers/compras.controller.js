const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
module.exports = createCrudController({ model: 'compra', validate: validators.compra, include: { cliente: true } });
