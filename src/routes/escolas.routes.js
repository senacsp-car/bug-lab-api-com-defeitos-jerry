const router = require('express').Router();
const controller = require('../controllers/escolas.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     EscolaInput:
 *       type: object
 *       required: [nome, cidade]
 *       properties:
 *         nome:
 *           type: string
 *           example: SENAI
 *         cidade:
 *           type: string
 *           example: São Paulo
 *     Escola:
 *       allOf:
 *         - $ref: '#/components/schemas/EscolaInput'
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
 * /escolas:
 *   get:
 *     summary: Lista todas as escolas
 *     tags: [Escolas]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de escolas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Escola'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria uma nova escola
 *     tags: [Escolas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EscolaInput'
 *     responses:
 *       201:
 *         description: Escola criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escola'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /escolas/{id}:
 *   get:
 *     summary: Retorna uma escola pelo ID
 *     tags: [Escolas]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Escola encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escola'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza uma escola existente
 *     tags: [Escolas]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EscolaInput'
 *     responses:
 *       200:
 *         description: Escola atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escola'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove uma escola pelo ID
 *     tags: [Escolas]
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
