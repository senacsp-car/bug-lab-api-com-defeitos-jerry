function notFound(req, res) {
  res.status(404).json({ erro: 'Rota não encontrada.' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 'P2002') return res.status(409).json({ erro: 'Já existe um registro com este valor único.' });
  if (err.code === 'P2003') return res.status(400).json({ erro: 'Relacionamento inválido ou registro ainda referenciado.' });
  if (err.code === 'P2025') return res.status(404).json({ erro: 'Registro não encontrado.' });
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}
module.exports = { notFound, errorHandler };
