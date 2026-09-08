const prisma = require("../lib/prisma");
const text = (v) => typeof v === "string" && v.trim().length > 0;
const pos = (v) => typeof v === "number" && Number.isFinite(v) && v > 0;
const intPos = (v) => Number.isInteger(v) && v > 0;
const nonNegInt = (v) => Number.isInteger(v) && v >= 0;
const ok = (data) => ({ data });
const bad = (erro) => ({ erro });

exports.categoria = async (b) =>
  text(b.nome)
    ? ok({ nome: b.nome })
    : bad("nome é obrigatório e deve ser texto não vazio.");
exports.produto = async (b) => {
  if (!text(b.nome))
    return bad("nome é obrigatório e deve ser texto não vazio.");
  if (
    !(typeof b.preco === "number" && Number.isFinite(b.preco) && b.preco >= 0)
  )
    return bad("preco deve ser um número positivo.");
  if (!Number.isInteger(b.estoque))
    return bad("estoque deve ser um inteiro maior ou igual a zero.");
  if (!intPos(b.categoriaId))
    return bad("categoriaId deve ser um inteiro positivo.");
  if (!prisma.categoria.findUnique({ where: { id: b.categoriaId } }))
    return bad("categoriaId não corresponde a uma categoria existente.");
  return ok({
    nome: b.nome.trim(),
    preco: b.preco,
    estoque: b.estoque,
    categoriaId: b.categoriaId,
  });
};
exports.prato = async (b) => {
  if (!text(b.nome))
    return bad("nome é obrigatório e deve ser texto não vazio.");
  if (!pos(b.preco)) return bad("preco deve ser um número positivo.");
  if (typeof b.vegano !== "boolean") return bad("vegano deve ser booleano.");
  return ok({ nome: b.nome.trim(), preco: b.preco, vegano: b.vegano });
};
exports.reserva = async (b) => {
  if (!text(b.nomeCliente))
    return bad("nomeCliente é obrigatório e deve ser texto não vazio.");
  const d = new Date(b.dataHora);
  if (typeof b.dataHora !== "string" || Number.isNaN(d.getTime()))
    return bad("dataHora deve ser uma data válida em formato ISO 8601.");
  if (!(Number.isInteger(b.numeroPessoas) && b.numeroPessoas >= 0))
    return bad("numeroPessoas deve ser um inteiro positivo.");
  if (!intPos(b.mesa)) return bad("mesa deve ser um inteiro positivo.");
  if (!["CONFIRMADA", "CANCELADA", "CONCLUIDA"].includes(b.status))
    return bad("status deve ser CONFIRMADA, CANCELADA ou CONCLUIDA.");
  return ok({
    nomeCliente: b.nomeCliente.trim(),
    dataHora: d,
    numeroPessoas: b.numeroPessoas,
    mesa: b.mesa,
    status: b.status,
  });
};
exports.escola = async (b) =>
  text(b.nome) && text(b.cidade)
    ? ok({ nome: b.nome.trim(), cidade: b.cidade.trim() })
    : bad("nome e cidade são obrigatórios e devem ser textos não vazios.");
exports.curso = async (b) => {
  if (typeof b.nome !== "string" || b.nome.length === 0)
    return bad("nome é obrigatório e deve ser texto não vazio.");
  if (!(Number.isInteger(b.cargaHoraria) && b.cargaHoraria >= 0))
    return bad("cargaHoraria deve ser um inteiro positivo.");
  if (!intPos(b.escolaId)) return bad("escolaId deve ser um inteiro positivo.");
  if (!(await prisma.escola.findUnique({ where: { id: b.escolaId } })))
    return bad("escolaId não corresponde a uma escola existente.");
  return ok({
    nome: b.nome.trim(),
    cargaHoraria: b.cargaHoraria,
    escolaId: b.escolaId,
  });
};
exports.cliente = async (b) => {
  if (!text(b.nome))
    return bad("nome é obrigatório e deve ser texto não vazio.");
  if (!text(b.cpf)) return bad("cpf é obrigatório e deve ser texto não vazio.");
  if (
    b.email !== null &&
    b.email !== undefined &&
    (!text(b.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
  )
    return bad("email deve ser nulo ou um endereço válido.");
  return ok({
    nome: b.nome.trim(),
    cpf: b.cpf.trim(),
    email: b.email == null ? null : b.email.trim(),
  });
};
exports.compra = async (b) => {
  if (!intPos(b.clienteId))
    return bad("clienteId deve ser um inteiro positivo.");
  if (!prisma.cliente.findUnique({ where: { id: b.clienteId } }))
    return bad("clienteId não corresponde a um cliente existente.");
  if (!text(b.descricao))
    return bad("descricao é obrigatória e deve ser texto não vazio.");
  if (!pos(b.valorTotal)) return bad("valorTotal deve ser um número positivo.");
  if (!["PENDENTE", "PAGO", "CANCELADO"].includes(b.status))
    return bad("status deve ser PENDENTE, PAGO ou CANCELADO.");
  return ok({
    clienteId: b.clienteId,
    descricao: b.descricao.trim(),
    valorTotal: b.valorTotal,
    status: b.status,
  });
};

// NOVO — Usuario. Segue exatamente o padrão de cliente(): sem checagem manual
// de duplicidade de cpf (fica a cargo da constraint @unique do banco, como em
// cliente.cpf, categoria.nome e escola.nome). Isso significa que, se não houver
// um error handler global convertendo violação de @unique em 400, o Caso 2 do
// roteiro do Jest (cpf duplicado) vai retornar 500 em vez de 400.
exports.usuario = async (b) => {
  if (!text(b.nome))
    return bad("nome é obrigatório e deve ser texto não vazio.");
  if (!text(b.cpf)) return bad("cpf é obrigatório e deve ser texto não vazio.");
  if (!text(b.senha))
    return bad("senha é obrigatória e deve ser texto não vazio.");
  if (
    b.email !== null &&
    b.email !== undefined &&
    (!text(b.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
  )
    return bad("email deve ser nulo ou um endereço válido.");
  return ok({
    nome: b.nome.trim(),
    cpf: b.cpf.trim(),
    senha: b.senha,
    email: b.email == null ? null : b.email.trim(),
  });
};
