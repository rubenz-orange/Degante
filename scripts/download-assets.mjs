// scripts/download-assets.mjs
import * as ftp from 'basic-ftp';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Cargar .env.local desde la raíz del proyecto
config({ path: resolve(rootDir, '.env.local') });

// Validar credenciales
const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`❌ Faltan variables: ${missing.join(', ')}`);
  process.exit(1);
}

// Ruta remota base del WordPress (ajustar según tu estructura)
// .env.local dice: FTP_ROOT=/domains/jimenezdegante.com/public_html
// Sitio actual: http://jimenezdegante.com/wp/ -> ruta física: .../public_html/wp
const REMOTE_UPLOADS_PATH = `${process.env.FTP_ROOT}/wp/wp-content/uploads`;
const LOCAL_ASSETS_DIR = resolve(rootDir, 'wp-backup/uploads');

async function downloadAssets() {
  const client = new ftp.Client();
  // client.ftp.verbose = true; // Activar para ver logs detallados

  try {
    console.log('🔌 Conectando al FTP...');
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      port: parseInt(process.env.FTP_PORT) || 21,
      secure: process.env.FTP_PROTOCOL === 'ftps'
    });
    console.log('✅ Conectado.');

    console.log(`📂 Descargando carpeta remota: ${REMOTE_UPLOADS_PATH}`);
    console.log(`💾 Destino local: ${LOCAL_ASSETS_DIR}`);

    // Solo descargamos wp-content/uploads que es lo valioso
    await client.ensureDir(LOCAL_ASSETS_DIR);
    await client.downloadToDir(LOCAL_ASSETS_DIR, REMOTE_UPLOADS_PATH);

    console.log('✅ Descarga completada exitosamente.');
  } catch (err) {
    console.error('❌ Error:', err);
  }
  client.close();
}

downloadAssets();
