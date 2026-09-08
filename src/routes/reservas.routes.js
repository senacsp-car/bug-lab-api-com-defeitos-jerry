const router = require('express').Router();
const controller = require('../controllers/reservas.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     ReservaInput:
 *       type: object
 *       required: [nomeCliente, dataHora, numeroPessoas, mesa, status]
 *       properties:
 *         nomeCliente:
 *           type: string
 *           example: João Silva
 *         dataHora:
 *           type: string
 *           format: date-time
 *           example: '2025-12-31T20:00:00.000Z'
 *         numeroPessoas:
 *           type: integer
 *           minimum: 1
 *           example: 4
 *         mesa:
 *           type: integer
 *           minimum: 1
 *           example: 7
 *         status:
 *           type: string
 *           enum: [CONFIRMADA, CANCELADA, CONCLUIDA]
 *           example: CONFIRMADA
 *     Reserva:
 *       allOf:
 *         - $ref: '#/components/schemas/ReservaInput'
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
 * /reservas:
 *   get:
 *     summary: Lista todas as reservas
 *     tags: [Reservas]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria uma nova reserva
 *     description: |
 *       - `dataHora` deve ser uma string ISO 8601 válida (ex.: `2025-12-31T20:00:00.000Z`).
 *       - `status` aceita apenas: `CONFIRMADA`, `CANCELADA` ou `CONCLUIDA`.
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaInput'
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /reservas/{id}:
 *   get:
 *     summary: Retorna uma reserva pelo ID
 *     tags: [Reservas]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza uma reserva existente
 *     tags: [Reservas]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaInput'
 *     responses:
 *       200:
 *         description: Reserva atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove uma reserva pelo ID
 *     tags: [Reservas]
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
