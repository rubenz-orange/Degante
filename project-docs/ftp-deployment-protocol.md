# Protocolo de Deployment FTP — Jiménez de Gante

> **Regla fundamental:** Las credenciales FTP **nunca** se escriben en comandos, scripts commiteados, ni en ningún archivo que pueda llegar a git. Solo se leen desde `.env.local`.

---

## 1. Arquitectura del Deployment

```
Código fuente (Astro)
      ↓
  npm run build
      ↓
  /dist  (archivos estáticos generados)
      ↓
  Script de deploy (lee .env.local)
      ↓
  Servidor FTP (jimenezdegante.com)
      ↓
  /public_html (sitio en vivo)
```

El directorio `dist/` **nunca** va a git — solo se sube al servidor vía FTP.

---

## 2. Configuración de Credenciales

### 2.1 Variables requeridas en `.env.local`
```bash
FTP_HOST=ftp.tuservidor.com        # Host FTP del hosting
FTP_USER=tu_usuario_ftp            # Usuario FTP
FTP_PASSWORD=tu_password_ftp       # Contraseña FTP
FTP_PORT=21                        # Puerto (21 estándar, 22 para SFTP)
FTP_REMOTE_PATH=/public_html       # Ruta destino en el servidor
```

### 2.2 Verificar que las variables están cargadas
```bash
# Verificar que el archivo existe y tiene valores
cat .env.local | grep -v "^#" | grep -v "^$"

# Nunca ejecutar este comando en un entorno compartido o CI/CD público
```

---

## 3. Herramienta de Deploy: `ftp-deploy`

Se usa el paquete `ftp-deploy` de Node.js para el deploy automatizado. Lee las credenciales desde `.env.local` en tiempo de ejecución.

### 3.1 Instalación (solo una vez)
```bash
npm install --save-dev ftp-deploy dotenv
```

### 3.2 Script de deploy (`scripts/deploy.mjs`)
Este archivo **sí va a git** — no contiene credenciales, solo las lee del entorno:

```js
// scripts/deploy.mjs
import FtpDeploy from 'ftp-deploy';
import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const ftpDeploy = new FtpDeploy();

const deployConfig = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: parseInt(process.env.FTP_PORT) || 21,
  localRoot: resolve(process.cwd(), 'dist'),
  remoteRoot: process.env.FTP_REMOTE_PATH || '/public_html',
  include: ['**/*'],
  exclude: ['.DS_Store', '**/.DS_Store'],
  deleteRemote: false,   // ⚠️ Cambiar a true solo cuando el sitio esté listo para reemplazar WordPress
  forcePasv: true,
};

// Validar que las credenciales están presentes
const required = ['FTP_USER', 'FTP_PASSWORD', 'FTP_HOST'];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error(`❌ Faltan variables de entorno: ${missing.join(', ')}`);
  console.error('   Verifica tu archivo .env.local');
  process.exit(1);
}

console.log(`🚀 Iniciando deploy a ${process.env.FTP_HOST}${process.env.FTP_REMOTE_PATH}`);
console.log(`   Usuario: ${process.env.FTP_USER}`);
console.log(`   Directorio local: dist/`);

ftpDeploy
  .deploy(deployConfig)
  .then(res => {
    console.log(`✅ Deploy completado. ${res.length} archivos subidos.`);
  })
  .catch(err => {
    console.error('❌ Error en el deploy:', err.message);
    process.exit(1);
  });
```

### 3.3 Agregar script en `package.json`
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "npm run build && node scripts/deploy.mjs"
  }
}
```

---

## 4. Checklist Pre-Deploy Obligatorio

Antes de ejecutar `npm run deploy`, verificar **todos** los puntos:

### 🔒 Seguridad
- [ ] `.env.local` existe y tiene todas las credenciales FTP completas
- [ ] Las credenciales son las correctas para el entorno de destino
- [ ] No se está deployando a producción desde una rama que no sea `main`

### ✅ Build
- [ ] `npm run build` completa sin errores
- [ ] El directorio `dist/` fue generado correctamente
- [ ] Revisar `dist/` localmente antes de subir: `npm run preview`

### 📋 Contenido
- [ ] Todo el contenido fue revisado y aprobado
- [ ] Las imágenes están optimizadas (< 200KB por imagen cuando sea posible)
- [ ] Los links internos y externos funcionan correctamente
- [ ] El sitio es responsive en móvil y desktop

### 🌐 Servidor
- [ ] Confirmar que el hosting tiene espacio suficiente
- [ ] Tener un backup del sitio actual (WordPress) antes del primer deploy

---

## 5. Flujo de Deploy Completo

```bash
# Paso 1: Asegurarse de estar en main y actualizado
git checkout main
git pull origin main

# Paso 2: Verificar que .env.local está configurado
cat .env.local

# Paso 3: Build de producción
npm run build

# Paso 4: Previsualizar localmente (opcional pero recomendado)
npm run preview
# Abrir http://localhost:4321 y verificar

# Paso 5: Deploy al servidor
npm run deploy

# Paso 6: Verificar el sitio en vivo
# Abrir https://jimenezdegante.com y verificar
```

---

## 6. Estrategia de Transición WordPress → Astro

Durante la migración, el sitio WordPress sigue en vivo. El deploy de Astro se hace en una **subcarpeta temporal** hasta que esté listo para reemplazarlo.

| Fase | `FTP_REMOTE_PATH` | Descripción |
|------|-------------------|-------------|
| Desarrollo | `/public_html/nuevo` | Deploy a subcarpeta para pruebas |
| Validación | `/public_html/nuevo` | Cliente revisa y aprueba |
| Producción | `/public_html` | Reemplaza WordPress definitivamente |

> ⚠️ **Importante:** Cambiar `deleteRemote: false` a `true` **solo** en el deploy final que reemplaza WordPress. Antes de hacerlo, tener un backup completo del sitio actual.

---

## 7. Rollback de Emergencia

Si el deploy causa problemas en producción:

```bash
# Opción 1: Restaurar backup de WordPress desde el hosting panel
# (cPanel → File Manager → Restaurar backup)

# Opción 2: Re-deploy de la versión anterior de Astro
git checkout <commit-anterior>
npm run build
npm run deploy
git checkout main
```

---

## 8. Seguridad del Servidor FTP

- Usar **FTPS** (FTP sobre TLS) si el hosting lo soporta — más seguro que FTP plano.
- Si el hosting soporta **SFTP** (SSH), preferirlo sobre FTP.
- Cambiar la contraseña FTP periódicamente (cada 6 meses).
- Usar un usuario FTP con acceso **solo** a `/public_html`, no al servidor completo.
- Nunca compartir credenciales FTP por canales no cifrados (WhatsApp, email sin cifrar).

---

*Última actualización: Febrero 2026*
