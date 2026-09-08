const router = require('express').Router();
const controller = require('../controllers/pratos.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     PratoInput:
 *       type: object
 *       required: [nome, preco, vegano]
 *       properties:
 *         nome:
 *           type: string
 *           example: Risoto de Cogumelos
 *         preco:
 *           type: number
 *           format: float
 *           exclusiveMinimum: 0
 *           example: 45.90
 *         vegano:
 *           type: boolean
 *           example: true
 *     Prato:
 *       allOf:
 *         - $ref: '#/components/schemas/PratoInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             criadoEm:
 *               type: string
 *               format: date-time
 */

/**
 * @openapi
 * /pratos:
 *   get:
 *     summary: Lista todos os pratos do cardápio
 *     tags: [Pratos]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de pratos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prato'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria um novo prato
 *     tags: [Pratos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PratoInput'
 *     responses:
 *       201:
 *         description: Prato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prato'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /pratos/{id}:
 *   get:
 *     summary: Retorna um prato pelo ID
 *     tags: [Pratos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Prato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prato'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza um prato existente
 *     tags: [Pratos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PratoInput'
 *     responses:
 *       200:
 *         description: Prato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prato'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove um prato pelo ID
 *     tags: [Pratos]
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
