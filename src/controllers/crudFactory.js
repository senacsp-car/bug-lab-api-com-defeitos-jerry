const prisma = require('../lib/prisma');

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
function pagination(query) {
  const skip = query.skip === undefined ? 0 : Number(query.skip);
  const take = query.take === undefined ? 100 : Number(query.take);
  if (!Number.isInteger(skip) || skip < 0 || !Number.isInteger(take) || take < 1 || take > 100) return null;
  return { skip, take };
}
function createCrudController({ model, validate, include, beforeDelete }) {
  const db = prisma[model];
  return {
    list: async (req, res, next) => { try {
      const page = pagination(req.query);
      if (!page) return res.status(400).json({ erro: 'skip deve ser inteiro >= 0 e take deve ser inteiro entre 1 e 100.' });
      res.json(await db.findMany({ ...page, orderBy: { id: 'asc' }, ...(include && { include }) }));
    } catch (e) { next(e); } },
    getById: async (req, res, next) => { try {
      const id = parseId(req.params.id);
      if (!id) return res.status(400).json({ erro: 'ID deve ser um inteiro positivo.' });
      const item = await db.findUnique({ where: { id }, ...(include && { include }) });
      if (!item) return res.status(404).json({ erro: 'Registro não encontrado.' });
      res.json(item);
    } catch (e) { next(e); } },
    create: async (req, res, next) => { try {
      const result = await validate(req.body, false);
      if (result.erro) return res.status(400).json({ erro: result.erro });
      res.status(201).json(await db.create({ data: result.data, ...(include && { include }) }));
    } catch (e) { next(e); } },
    update: async (req, res, next) => { try {
      const id = parseId(req.params.id);
      if (!id) return res.status(400).json({ erro: 'ID deve ser um inteiro positivo.' });
      if (!await db.findUnique({ where: { id } })) return res.status(404).json({ erro: 'Registro não encontrado.' });
      const result = await validate(req.body, true);
      if (result.erro) return res.status(400).json({ erro: result.erro });
      res.json(await db.update({ where: { id }, data: result.data, ...(include && { include }) }));
    } catch (e) { next(e); } },
    remove: async (req, res, next) => { try {
      const id = parseId(req.params.id);
      if (!id) return res.status(400).json({ erro: 'ID deve ser um inteiro positivo.' });
      if (!await db.findUnique({ where: { id } })) return res.status(404).json({ erro: 'Registro não encontrado.' });
      if (beforeDelete) { const erro = await beforeDelete(id); if (erro) return res.status(400).json({ erro }); }
      await db.delete({ where: { id } });
      res.status(204).send();
    } catch (e) { next(e); } }
  };
}
module.exports = { createCrudController };
