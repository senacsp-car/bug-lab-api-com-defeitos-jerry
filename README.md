# API Didática — Express + Prisma + SQLite

Back-end REST em JavaScript para atividades de testes caixa-preta via Postman.

## Requisitos
- Node.js 20.10.0 ou outra versão 20.x compatível
- npm

## Instalação
```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma db seed
npm start
```
No Windows, copie `.env.example` para `.env` pelo Explorador ou use `copy .env.example .env`.

Teste: `GET http://localhost:3000/health` deve responder `{ "status": "ok" }`.

## Acesso na rede local
O servidor escuta em `0.0.0.0`. Descubra o IPv4 da máquina:
- Windows: `ipconfig`
- Linux: `ip a` ou `ifconfig`
- macOS: `ifconfig`

Compartilhe `http://SEU_IP:3000`, por exemplo `http://192.168.1.25:3000`. Talvez seja necessário liberar a porta 3000 no firewall. Todos devem estar na mesma rede.

## Rotas
Recursos: `/categorias`, `/produtos`, `/pratos`, `/reservas`, `/escolas`, `/cursos`, `/clientes`, `/compras`.
Para cada recurso: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`. Listagens aceitam `?skip=0&take=20` (take máximo 100).

`PUT` exige todos os campos editáveis. Campos com valor padrão no banco também devem ser enviados: `estoque`, `vegano`, `status` de reserva e `status` de compra.

## Exemplos
```json
POST /produtos
{ "nome": "Caneta azul", "preco": 3.5, "estoque": 20, "categoriaId": 2 }
```
```json
POST /reservas
{ "nomeCliente": "Lúcia Alves", "dataHora": "2026-10-05T19:30:00-03:00", "numeroPessoas": 3, "mesa": 4, "status": "CONFIRMADA" }
```

## Códigos HTTP principais
- 200: consulta/atualização; 201: criação; 204: exclusão
- 400: dados inválidos; 404: rota/registro inexistente; 409: valor único duplicado; 500: erro inesperado
