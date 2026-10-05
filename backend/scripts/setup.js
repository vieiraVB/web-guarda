const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const backendPath = path.resolve(__dirname, "..");
const envPath = path.join(backendPath, ".env");
const envExamplePath = path.join(backendPath, ".env.example");

if (!fs.existsSync(envPath)) {
  if (!fs.existsSync(envExamplePath)) {
    console.error("Arquivo .env.example não encontrado.");
    process.exit(1);
  }

  fs.copyFileSync(envExamplePath, envPath);
  console.log("Arquivo .env criado a partir do .env.example.");
} else {
  console.log("Arquivo .env já existe.");
}

console.log("Aplicando migrations...");
execSync("npx prisma migrate deploy", {
  cwd: backendPath,
  stdio: "inherit",
});

console.log("Gerando Prisma Client...");
execSync("npx prisma generate", {
  cwd: backendPath,
  stdio: "inherit",
});

console.log("Setup do backend concluído.");