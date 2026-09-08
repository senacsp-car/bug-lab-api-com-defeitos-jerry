const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.compra.deleteMany(); await prisma.cliente.deleteMany(); await prisma.curso.deleteMany(); await prisma.escola.deleteMany();
  await prisma.reserva.deleteMany(); await prisma.prato.deleteMany(); await prisma.produto.deleteMany(); await prisma.categoria.deleteMany();
  const alimentos = await prisma.categoria.create({ data:{ nome:'Alimentos' } });
  const papelaria = await prisma.categoria.create({ data:{ nome:'Papelaria' } });
  const higiene = await prisma.categoria.create({ data:{ nome:'Higiene' } });
  const eletronicos = await prisma.categoria.create({ data:{ nome:'Eletrônicos' } });
  await prisma.produto.createMany({ data:[
    { nome:'Arroz integral', preco:8.90, estoque:25, categoriaId:alimentos.id },
    { nome:'Caderno universitário', preco:19.50, estoque:12, categoriaId:papelaria.id },
    { nome:'Sabonete neutro', preco:4.75, estoque:40, categoriaId:higiene.id },
    { nome:'Fone de ouvido', preco:59.90, estoque:15, categoriaId:eletronicos.id }
  ]});
  await prisma.prato.createMany({ data:[
    { nome:'Feijoada da casa', preco:32.00, vegano:false }, { nome:'Moqueca de banana', preco:29.00, vegano:true }, { nome:'Salada tropical', preco:21.50, vegano:true }
  ]});
  await prisma.reserva.createMany({ data:[
    { nomeCliente:'Marina Lopes', dataHora:new Date('2026-09-10T19:30:00-03:00'), numeroPessoas:4, mesa:5, status:'CONFIRMADA' },
    { nomeCliente:'João Lima', dataHora:new Date('2026-09-11T20:00:00-03:00'), numeroPessoas:2, mesa:2, status:'CONFIRMADA' }
  ]});
  const e1=await prisma.escola.create({ data:{ nome:'Escola Técnica Horizonte', cidade:'São Carlos' } });
  const e2=await prisma.escola.create({ data:{ nome:'Instituto Saber', cidade:'Araraquara' } });
  const e3=await prisma.escola.create({ data:{ nome:'Colégio Vanguarda', cidade:'Ribeirão Preto' } });
  const e4=await prisma.escola.create({ data:{ nome:'Centro Educacional Aurora', cidade:'Rio Claro' } });
  await prisma.curso.createMany({ data:[
    { nome:'Desenvolvimento de Sistemas', cargaHoraria:1200, escolaId:e1.id }, { nome:'Redes de Computadores', cargaHoraria:1000, escolaId:e1.id }, { nome:'Administração', cargaHoraria:800, escolaId:e2.id }, { nome:'Design Gráfico', cargaHoraria:600, escolaId:e3.id }
  ]});
  const c1=await prisma.cliente.create({ data:{ nome:'Ana Beatriz Souza', cpf:'123.456.789-01', email:'ana@example.com' } });
  const c2=await prisma.cliente.create({ data:{ nome:'Carlos Eduardo Melo', cpf:'987.654.321-00', email:'carlos@example.com' } });
  const c3=await prisma.cliente.create({ data:{ nome:'Fernanda Ribeiro', cpf:'456.789.123-02', email:'fernanda@example.com' } });
  const c4=await prisma.cliente.create({ data:{ nome:'Rodrigo Alves', cpf:'321.654.987-03', email:'rodrigo@example.com' } });
  await prisma.compra.createMany({ data:[
    { clienteId:c1.id, descricao:'Materiais escolares', valorTotal:89.90, status:'PAGO' },
    { clienteId:c2.id, descricao:'Itens de higiene', valorTotal:42.30, status:'PENDENTE' }
  ]});
  console.log('Seed concluído com sucesso.');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
