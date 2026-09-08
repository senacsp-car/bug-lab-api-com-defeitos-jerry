const router = require('express').Router();
const controller = require('../controllers/compras.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     CompraInput:
 *       type: object
 *       required: [clienteId, descricao, valorTotal, status]
 *       properties:
 *         clienteId:
 *           type: integer
 *           example: 1
 *           description: ID de um Cliente existente
 *         descricao:
 *           type: string
 *           example: Compra de notebook e mouse
 *         valorTotal:
 *           type: number
 *           format: float
 *           exclusiveMinimum: 0
 *           example: 3150.00
 *         status:
 *           type: string
 *           enum: [PENDENTE, PAGO, CANCELADO]
 *           example: PENDENTE
 *     Compra:
 *       allOf:
 *         - $ref: '#/components/schemas/CompraInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             criadoEm:
 *               type: string
 *               format: date-time
 *             cliente:
 *               $ref: '#/components/schemas/Cliente'
 */

/**
 * @openapi
 * /compras:
 *   get:
 *     summary: Lista todas as compras (inclui cliente)
 *     tags: [Compras]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria uma nova compra
 *     description: |
 *       - `clienteId` deve referenciar um **Cliente** existente.
 *       - `status` aceita apenas: `PENDENTE`, `PAGO` ou `CANCELADO`.
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompraInput'
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /compras/{id}:
 *   get:
 *     summary: Retorna uma compra pelo ID (inclui cliente)
 *     tags: [Compras]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza uma compra existente
 *     tags: [Compras]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompraInput'
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove uma compra pelo ID
 *     tags: [Compras]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContent'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
