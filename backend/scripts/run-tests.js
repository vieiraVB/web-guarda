const { execSync } = require("node:child_process");

process.env.DATABASE_URL ||= "postgresql://test:test@localhost:5432/test?schema=public";
process.env.JWT_SECRET ||= "web-guarda-test-secret";

execSync("npx prisma generate && npx jest --runInBand", {
  env: process.env,
  stdio: "inherit",
});