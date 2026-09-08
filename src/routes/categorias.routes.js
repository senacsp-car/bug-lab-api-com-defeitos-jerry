const router = require('express').Router();
const controller = require('../controllers/categorias.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoriaInput:
 *       type: object
 *       required: [nome]
 *       properties:
 *         nome:
 *           type: string
 *           example: Eletrônicos
 *     Categoria:
 *       allOf:
 *         - $ref: '#/components/schemas/CategoriaInput'
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
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /categorias/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categorias]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove uma categoria pelo ID
 *     tags: [Categorias]
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
