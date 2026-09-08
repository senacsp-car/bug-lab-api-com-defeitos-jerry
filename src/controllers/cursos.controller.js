const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
module.exports = createCrudController({ model: 'curso', validate: validators.curso, include: { escola: true } });
