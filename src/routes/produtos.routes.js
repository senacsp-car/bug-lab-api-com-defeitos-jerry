const router = require('express').Router();
const controller = require('../controllers/produtos.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     ProdutoInput:
 *       type: object
 *       required: [nome, preco, estoque, categoriaId]
 *       properties:
 *         nome:
 *           type: string
 *           example: Notebook
 *         preco:
 *           type: number
 *           format: float
 *           exclusiveMinimum: 0
 *           example: 2999.90
 *         estoque:
 *           type: integer
 *           minimum: 0
 *           example: 10
 *         categoriaId:
 *           type: integer
 *           example: 1
 *           description: ID de uma Categoria existente
 *     Produto:
 *       allOf:
 *         - $ref: '#/components/schemas/ProdutoInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             criadoEm:
 *               type: string
 *               format: date-time
 *             categoria:
 *               $ref: '#/components/schemas/Categoria'
 */

/**
 * @openapi
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos (inclui categoria)
 *     tags: [Produtos]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria um novo produto
 *     description: O campo `categoriaId` deve referenciar uma **Categoria** existente.
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID (inclui categoria)
 *     tags: [Produtos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
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
