const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
module.exports = createCrudController({ model: 'produto', validate: validators.produto, include: { categoria: true } });
