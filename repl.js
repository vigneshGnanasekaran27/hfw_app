const repl = require('repl');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const server = repl.start('prisma> ');
server.context.prisma = prisma;

server.on('exit', async () => {
  await prisma.$disconnect();
  process.exit();
});

console.log(Object.keys(prisma).filter(k => typeof prisma[k]?.findMany === 'function'));