# Arquitectura del Sitio — Jiménez de Gante

Este documento describe la estructura técnica, flujo de datos y decisiones de diseño del nuevo sitio web basado en Astro.

---

## 1. Stack Tecnológico

- **Framework:** [Astro v5+](https://astro.build/) (SSG - Static Site Generation).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Motor de diseño moderno en CSS).
- **Tipografía:** Inter (vía Google Fonts).
- **Iconografía:** Emojis y SVG nativos para optimización.
- **Despliegue:** FTP tradicional automatizado mediante scripts de Node.js.

---

## 2. Estructura del Proyecto

```text
/
├── .env.local          # Credenciales locales (ignoradas por Git)
├── astro.config.mjs    # Configuración de Astro (Base URL, Tailwind)
├── package.json        # Dependencias y scripts de construcción/deploy
├── project-docs/       # Documentación y protocolos
├── public/             # Archivos estáticos (favicons, etc.)
├── scripts/            # Automatización (deploy, download-assets)
└── src/
    ├── components/     # UI Reutilizable (Header, Footer, Hero)
    ├── layouts/        # Plantilla maestra (Layout.astro)
    ├── pages/          # Rutas del sitio (Inicio, Obras, etc.)
    └── styles/         # CSS Global y configuración de Tailwind
```

---

## 3. Estrategia de Enrutamiento y Base URL

Para permitir que el sitio funcione tanto en la raíz como en subcarpetas (ej. `/new/`), se utiliza la configuración `base` de Astro.

- **Variables Críticas:** `import.meta.env.BASE_URL` se utiliza en todos los enlaces internos.
- **Configuración:** Definida en `astro.config.mjs`.

### Ejemplo de uso:
```astro
<!-- ✅ Correcto: Funciona en cualquier ruta base -->
<a href={`${import.meta.env.BASE_URL}/obras`}>Obras</a>

<!-- ❌ Incorrecto: Se rompe en subcarpetas -->
<a href="/obras">Obras</a>
```

---

## 4. Diseño y Estética

El diseño utiliza una paleta corporativa estricta definida en `global.css` mediante `@theme`:

- **Primary (`#f39c12`):** Naranja para CTAs, iconos y enlaces destacados.
- **Secondary (`#2c3e50`):** Gris oscuro/Azul para fondos de footer y headers.
- **Inter:** Elegida por su alta legibilidad técnica, adecuada para una firma de arquitectura y consultoría.

---

## 5. Flujo de Publicación (CI/CD Local)

1. **Desarrollo:** `npm run dev` (Localhost).
2. **Construcción:** `npm run build` genera la carpeta `dist/`.
3. **Validación:** `npm run preview` para ver el resultado de producción localmente.
4. **Despliegue:** `npm run deploy` ejecuta el build y sube vía FTP usando las credenciales de `.env.local`.

---

## 6. Seguridad (Resumen)

- **Zero-Secrets Policy:** Ninguna credencial en Git.
- **Static Assets:** Al ser un sitio estático generado (SSG), no hay bases de datos ni backend expuesto, eliminando vectores de ataque tradicionales de WordPress.

---

*Última actualización: Febrero 2026*
