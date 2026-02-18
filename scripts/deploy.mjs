// scripts/deploy.mjs
// ⚠️  Este script lee credenciales EXCLUSIVAMENTE desde .env.local
// ⚠️  Nunca hardcodear credenciales aquí — ver project-docs/ftp-deployment-protocol.md

import FtpDeploy from 'ftp-deploy';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Cargar .env.local desde la raíz del proyecto
config({ path: resolve(rootDir, '.env.local') });

// Validar que las credenciales están presentes antes de continuar
const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('\n❌ Error: Faltan variables de entorno requeridas:');
  missing.forEach((key) => console.error(`   - ${key}`));
  console.error('\n   Verifica tu archivo .env.local');
  console.error('   Referencia: project-docs/ftp-deployment-protocol.md\n');
  process.exit(1);
}

const ftpDeploy = new FtpDeploy();

const deployConfig = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: parseInt(process.env.FTP_PORT) || 21,
  localRoot: resolve(rootDir, 'dist'),
  remoteRoot: process.env.FTP_REMOTE_PATH || '/public_html',
  include: ["**/*", ".htaccess"],
  exclude: ['.DS_Store', '**/.DS_Store', 'Thumbs.db'],
  // ⚠️ deleteRemote: false durante desarrollo/pruebas
  // Cambiar a true SOLO para el deploy final que reemplaza WordPress
  deleteRemote: true,
  forcePasv: true,
};

console.log('\n🚀 Iniciando deploy — Jiménez de Gante');
console.log(`   Host:      ${process.env.FTP_HOST}`);
console.log(`   Usuario:   ${process.env.FTP_USER}`);
console.log(`   Destino:   ${deployConfig.remoteRoot}`);
console.log(`   Origen:    dist/\n`);

ftpDeploy.on('uploading', (data) => {
  const pct = Math.round((data.transferredFileCount / data.totalFilesCount) * 100);
  process.stdout.write(`\r   Subiendo... ${pct}% (${data.transferredFileCount}/${data.totalFilesCount}) — ${data.filename}`);
});

ftpDeploy
  .deploy(deployConfig)
  .then((res) => {
    console.log(`\n\n✅ Deploy completado. ${res.length} archivos subidos.`);
    console.log(`   Verificar en: https://jimenezdegante.com\n`);
  })
  .catch((err) => {
    console.error('\n❌ Error en el deploy:', err.message);
    console.error('   Verifica las credenciales en .env.local\n');
    process.exit(1);
  });
