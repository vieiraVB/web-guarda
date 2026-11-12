const { spawnSync } = require('node:child_process');
const path = require('node:path');

process.chdir(path.resolve(__dirname, '..'));

function prisma(...args) {
  const result = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), ...args], {
    stdio: 'inherit',
    env: process.env,
  });
  if (result.error) {
    console.error('Não foi possível iniciar o Prisma:', result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

prisma('migrate', 'deploy');
if (process.env.SEED_DEMO === 'true') prisma('db', 'seed');
const app = require('../src/app.js');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web Guarda API rodando na porta ${port}`);
});
