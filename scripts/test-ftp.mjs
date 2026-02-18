// scripts/test-ftp.mjs
// Script temporal para probar la conexión FTP
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import FtpDeploy from 'ftp-deploy';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
config({ path: resolve(rootDir, '.env.local') });

const ftpDeploy = new FtpDeploy();

const testConfig = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS || process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: parseInt(process.env.FTP_PORT) || 21,
  localRoot: resolve(rootDir, 'public'),
  remoteRoot: process.env.FTP_ROOT || '/public_html',
  include: ['favicon.ico'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
};

console.log('\n🔌 Probando conexión FTP...');
console.log(`   Host:    ${testConfig.host}:${testConfig.port}`);
console.log(`   Usuario: ${testConfig.user}`);
console.log(`   Ruta:    ${testConfig.remoteRoot}\n`);

ftpDeploy
  .deploy(testConfig)
  .then(() => {
    console.log('✅ Conexión FTP exitosa!\n');
  })
  .catch((err) => {
    console.error('❌ Error de conexión FTP:', err.message, '\n');
    process.exit(1);
  });
