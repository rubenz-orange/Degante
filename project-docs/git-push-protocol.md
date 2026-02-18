# Protocolo de Git Push — Jiménez de Gante

> **Regla fundamental:** Nunca hacer push directamente a `main`. Todo cambio pasa por una rama de trabajo y un pull request revisado.

---

## 1. Estrategia de Ramas

```
main          ← producción estable, siempre deployable
  └── dev     ← integración de features en desarrollo
        └── feature/nombre-feature   ← trabajo activo
        └── fix/nombre-bug           ← correcciones
        └── content/nombre-seccion   ← actualizaciones de contenido
```

### Reglas de ramas
- `main` — Solo recibe merges desde `dev` cuando el sitio está listo para deploy.
- `dev` — Rama de integración. Aquí se prueban los cambios antes de producción.
- `feature/*` — Una rama por feature o sección del sitio.
- `fix/*` — Para correcciones de bugs.
- `content/*` — Para actualizaciones de texto/imágenes sin cambios de código.

---

## 2. Convención de Commits

Usar el estándar **Conventional Commits**:

```
<tipo>(<alcance>): <descripción corta en español>

Tipos permitidos:
  feat     → nueva funcionalidad
  fix      → corrección de bug
  style    → cambios de estilos/CSS (sin lógica)
  content  → actualización de contenido/texto
  refactor → refactorización sin cambio de comportamiento
  docs     → cambios en documentación
  chore    → tareas de mantenimiento (deps, config)
```

### Ejemplos válidos
```bash
git commit -m "feat(home): agregar sección hero con CTA principal"
git commit -m "fix(nav): corregir menú móvil en Safari"
git commit -m "content(obras): actualizar lista de servicios DRO"
git commit -m "style(layout): ajustar espaciado en footer"
git commit -m "chore: actualizar dependencias de astro a v5.2"
```

---

## 3. Checklist Pre-Push Obligatorio

Antes de ejecutar `git push`, verificar **todos** los puntos:

### 🔒 Seguridad
- [ ] `git diff HEAD` no contiene contraseñas, tokens ni llaves
- [ ] `.env.local` no aparece en `git status`
- [ ] No hay archivos `*.pem`, `*.key` o similares en el staging

```bash
# Verificar que no hay secretos en el staging
git diff --staged | grep -iE "(password|secret|token|key|ftp_)" 
# Si el comando devuelve resultados → NO hacer push, revisar primero
```

### ✅ Calidad
- [ ] El proyecto compila sin errores: `npm run build`
- [ ] No hay errores de TypeScript: `npx astro check`
- [ ] Los cambios fueron probados localmente con `npm run dev`

### 📝 Commits
- [ ] Los mensajes de commit siguen la convención definida
- [ ] Cada commit tiene un propósito único y claro
- [ ] No hay commits de "wip" o "temp" en la rama

---

## 4. Flujo de Trabajo Estándar

```bash
# 1. Partir siempre desde dev actualizado
git checkout dev
git pull origin dev

# 2. Crear rama de trabajo
git checkout -b feature/nombre-de-la-feature

# 3. Trabajar y commitear
git add .
git commit -m "feat(seccion): descripción del cambio"

# 4. Verificar antes de push
npm run build          # debe completar sin errores
npx astro check        # 0 errores, 0 warnings

# 5. Push de la rama
git push origin feature/nombre-de-la-feature

# 6. Abrir Pull Request en GitHub hacia dev
# 7. Revisar y mergear
# 8. Eliminar la rama después del merge
git branch -d feature/nombre-de-la-feature
```

---

## 5. Merge a Main (Deploy)

Solo cuando `dev` está estable y probado:

```bash
git checkout main
git pull origin main
git merge dev --no-ff -m "chore: merge dev → main para deploy vX.X"
git push origin main
```

El merge a `main` **dispara automáticamente** el proceso de deploy (ver `ftp-deployment-protocol.md`).

---

## 6. Configuración Inicial del Repositorio

```bash
# Configurar identidad local (si no está configurada)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Verificar remote
git remote -v
# Debe mostrar: origin  https://github.com/rubenz-orange/Degante.git

# Primer push (solo una vez)
git add .
git commit -m "chore: setup inicial — Astro 5 + Tailwind CSS v4"
git push -u origin main
```

---

## 7. Qué NUNCA debe ir en un commit

| ❌ Prohibido | Alternativa |
|-------------|-------------|
| Contraseñas o tokens | Usar `.env.local` |
| Archivos `.env.local` | Está en `.gitignore` |
| `node_modules/` | Está en `.gitignore` |
| Archivos `dist/` | Está en `.gitignore` |
| Credenciales FTP | Usar `.env.local` |
| IPs o rutas de servidor | Usar variables de entorno |
| Archivos de backup (`*.bak`, `*.old`) | Eliminar antes de commit |

---

*Última actualización: Febrero 2026*
