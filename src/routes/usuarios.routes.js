const router = require("express").Router();
const controller = require("../controllers/usuarios.controller");

/**
 * @openapi
 * components:
 *   schemas:
 *     UsuarioInput:
 *       type: object
 *       required: [nome, cpf, senha]
 *       properties:
 *         nome:
 *           type: string
 *           example: Maria Oliveira
 *         cpf:
 *           type: string
 *           example: '123.456.789-00'
 *         senha:
 *           type: string
 *           example: 'senhaSecreta123'
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: maria@email.com
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Maria Oliveira
 *         cpf:
 *           type: string
 *           example: '123.456.789-00'
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: maria@email.com
 *         criadoEm:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuarios]
 *     parameters:
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   post:
 *     summary: Cria um novo usuário
 *     description: |
 *       - `cpf` deve ser único no banco de dados.
 *       - `email` é opcional; quando informado deve ser um endereço válido.
 *       - `senha` é obrigatória e nunca é retornada nas respostas.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get("/", controller.list);
router.post("/", controller.create);

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuarios]
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Usuarios]
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
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
// BUG: a rota de exclusão não foi registrada.
// DELETE /usuarios/:id retorna 404 (rota inexistente) em vez de 204,
// mesmo o controller.remove existindo e estando corretamente implementado.
// router.delete('/:id', controller.remove);

module.exports = router;
