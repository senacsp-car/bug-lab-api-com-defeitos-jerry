const router = require('express').Router();
const controller = require('../controllers/cursos.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     CursoInput:
 *       type: object
 *       required: [nome, cargaHoraria, escolaId]
 *       properties:
 *         nome:
 *           type: string
 *           example: Desenvolvimento Web
 *         cargaHoraria:
 *           type: integer
 *           minimum: 1
 *           example: 160
 *         escolaId:
 *           type: integer
 *           example: 1
 *           description: ID de uma Escola existente
 *     Curso:
 *       allOf:
 *         - $ref: '#/components/schemas/CursoInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             criadoEm:
 *               type: string
 *               format: date-time
 *             escola:
 *               $ref: '#/components/schemas/Escola'
 */

/**
 * @openapi
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos (inclui escola)
 *     tags: [Cursos]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria um novo curso
 *     description: O campo `escolaId` deve referenciar uma **Escola** existente.
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/', controller.list);
router.post('/', controller.create);

/**
 * @openapi
 * /cursos/{id}:
 *   get:
 *     summary: Retorna um curso pelo ID (inclui escola)
 *     tags: [Cursos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza um curso existente
 *     tags: [Cursos]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove um curso pelo ID
 *     tags: [Cursos]
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
