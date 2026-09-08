const { createCrudController } = require('./crudFactory');
const validators = require('./validators');
module.exports = createCrudController({ model: 'reserva', validate: validators.reserva });
