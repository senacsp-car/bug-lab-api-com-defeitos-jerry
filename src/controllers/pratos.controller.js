const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
module.exports = createCrudController({ model: 'prato', validate: validators.prato });
