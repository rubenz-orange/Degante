# Protocolo de Seguridad — Jiménez Degante

> **Regla fundamental:** Ninguna llave, credencial, contraseña o token debe existir en el código fuente ni en el historial de git, bajo ninguna circunstancia.

---

## 1. Gestión de Secretos y Variables de Entorno

### 1.1 Archivos permitidos para secretos
- Todos los secretos (FTP, APIs, tokens) viven **únicamente** en `.env.local`.
- `.env.local` está en `.gitignore` y **nunca** debe ser commiteado.
- Se permite un archivo `.env.example` con las **claves vacías** (sin valores) como referencia para el equipo.

```bash
# ✅ Correcto — .env.example (sí va a git)
FTP_HOST=
FTP_USER=
FTP_PASSWORD=
FTP_PORT=

# ❌ Incorrecto — nunca hardcodear valores reales
FTP_HOST=ftp.miservidor.com
FTP_PASSWORD=mipassword123
```

### 1.2 Reglas de .gitignore obligatorias
Los siguientes patrones deben estar siempre en `.gitignore`:

```
.env
.env.local
.env.*.local
.env.production
*.pem
*.key
*.p12
*.pfx
id_rsa
id_ed25519
```

### 1.3 Acceso a variables en el código
- En Astro, las variables de entorno del servidor se acceden con `import.meta.env.VARIABLE`.
- Las variables expuestas al cliente **deben** tener el prefijo `PUBLIC_`.
- Nunca pasar secretos a variables `PUBLIC_*`.

```js
// ✅ Correcto — solo en scripts de servidor/Node
const ftpHost = import.meta.env.FTP_HOST;

// ❌ Incorrecto — expone el secreto al navegador
const ftpHost = import.meta.env.PUBLIC_FTP_HOST;
```

---

## 2. Control de Acceso al Repositorio

### 2.1 Permisos
- El repositorio en GitHub debe ser **privado** mientras el sitio esté en desarrollo.
- Solo colaboradores autorizados tienen acceso de escritura (`push`).
- Revisar y revocar accesos de colaboradores que ya no participen en el proyecto.

### 2.2 Protección de la rama `main`
Configurar en GitHub → Settings → Branches → Branch protection rules:
- ✅ Require pull request before merging
- ✅ Require at least 1 approval
- ✅ Do not allow bypassing the above settings

---

## 3. Revisión de Código Antes de Commit

### 3.1 Checklist pre-commit obligatorio
Antes de cada `git commit`, verificar manualmente:

- [ ] No hay contraseñas, tokens ni llaves en el diff (`git diff --staged`)
- [ ] No se están commiteando archivos `.env*` (excepto `.env.example`)
- [ ] No hay rutas absolutas de servidor hardcodeadas
- [ ] No hay IPs privadas ni URLs internas en el código

### 3.2 Detección de secretos (recomendado)
Instalar `git-secrets` o `gitleaks` para detección automática:

```bash
# Instalar gitleaks (macOS)
brew install gitleaks

# Escanear el repositorio antes de push
gitleaks detect --source . --verbose
```

---

## 4. Dependencias y Auditoría

- Ejecutar `npm audit` antes de cada release.
- No instalar paquetes de fuentes no verificadas.
- Mantener las dependencias actualizadas con `npm outdated`.

```bash
# Auditoría de seguridad
npm audit

# Ver dependencias desactualizadas
npm outdated
```

---

## 5. Historial de Git — Limpieza de Secretos

Si accidentalmente se commitea un secreto:

1. **Cambiar inmediatamente** la credencial comprometida en el servidor.
2. Limpiar el historial con `git filter-repo` (no usar `git filter-branch`):

```bash
# Instalar git-filter-repo
pip install git-filter-repo

# Eliminar el archivo del historial completo
git filter-repo --path .env.local --invert-paths

# Forzar push (requiere permisos de admin en GitHub)
git push origin --force --all
```

3. Notificar a todos los colaboradores para que hagan `git clone` fresco.

---

## 6. Archivos Sensibles del Proyecto

| Archivo | ¿Va a git? | Propósito |
|---------|-----------|-----------|
| `.env.local` | ❌ NO | Credenciales FTP y secretos locales |
| `.env.example` | ✅ SÍ | Plantilla de variables (sin valores) |
| `package-lock.json` | ✅ SÍ | Lock de dependencias |
| `astro.config.mjs` | ✅ SÍ | Configuración del framework |
| `project-docs/` | ✅ SÍ | Documentación del proyecto |

---

*Última actualización: Febrero 2026*
