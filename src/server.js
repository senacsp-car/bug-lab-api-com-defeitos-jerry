require('dotenv').config();
const app = require('./app');
const prisma = require('./lib/prisma');
const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, '0.0.0.0', () => console.log(`API disponível em http://0.0.0.0:${port}`));
async function shutdown() { await prisma.$disconnect(); server.close(() => process.exit(0)); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
