const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// ── Documentação Swagger ────────────────────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "API Didática Prisma — Docs",
    swaggerOptions: { tryItOutEnabled: true, filter: true },
  }),
);
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));

// ── Health ──────────────────────────────────────────────────────────────────
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verifica se a API está operacional
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API em funcionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ── Rotas de recursos ───────────────────────────────────────────────────────
for (const recurso of [
  "categorias",
  "produtos",
  "pratos",
  "reservas",
  "escolas",
  "cursos",
  "clientes",
  "compras",
  "usuarios",
]) {
  app.use("/" + recurso, require("./routes/" + recurso + ".routes"));
}

app.use(notFound);
app.use(errorHandler);
module.exports = app;
