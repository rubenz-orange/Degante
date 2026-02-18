# Plan de Optimización para Buscadores (SEO) e Inteligencia Artificial (AISO)

Este documento detalla la estrategia para posicionar a **Jiménez Degante Arquitectos** como una autoridad en arquitectura técnica y legal en la CDMX, optimizando tanto para Google como para modelos de lenguaje (LLMs/IAs).

## 1. Fundamentos de AISO (AI Search Optimization)
A diferencia del SEO tradicional, la optimización para IAs se basa en la **claridad de entidades** y el **contexto semántico**.

- **JSON-LD (Schema.org)**: Implementar datos estructurados profundos para que las IAs identifiquen a la firma como una entidad de tipo `LocalBusiness` y `Organization`.
- **E-E-A-T (Experiencia, Pericia, Autoridad, Confianza)**: Reforzar los más de 25 años de trayectoria y las certificaciones (DRO, Protección Civil) en el contenido.
- **Micro-datos**: Asegurar que cada servicio esté etiquetado correctamente.

## 2. Estrategia SEO Técnica
- **Meta Tags**: Títulos y descripciones optimizadas con palabras clave de alta intención (`DRO CDMX`, `Regularización de construcción`, `Trámites SEDUVI`).
- **Jerarquía de Encabezados**: Uso estricto de `<h1>` a `<h3>` para definir la estructura de la información.
- **Sitemap & Robots.txt**: Facilitar el rastreo preventivo.
- **Open Graph & Twitter Cards**: Controlar cómo se visualiza el contenido al ser compartido o citado.

## 3. Implementación por Sección

### Global (Layout.astro)
- [ ] Implementar Schema global de `LocalBusiness`.
- [ ] Definir `canonical URLs`.
- [ ] Agregar tags de idioma y región (`es-MX`).

### Página de Inicio
- [ ] Optimizar el Hero con el concepto "Arquitectura Legal y Técnica en CDMX".
- [ ] Estructurar los servicios como nodos de conocimiento.

### Obras y Proyectos
- [ ] Enfocar palabras clave en: `DRO`, `Manifestación de construcción`, `Cálculo Estructural`.
- [ ] Agregar Schema de `Service`.

### Trámites Mercantiles & Generales
- [ ] Palabras clave: `Licencia de funcionamiento`, `Protección Civil`, `SEDUVI`, `INBA`, `INAH`.
- [ ] Estructurar las listas de trámites para ser fácilmente extraídas por IAs.

### Ubicación
- [ ] Schema `PostalAddress` y `GeoCoordinates`.
- [ ] Claridad en el punto de referencia (Buenavista, Cuauhtémoc).

## 4. Próximos Pasos (Inmediatos)
1. Crear `public/robots.txt`.
2. Actualizar `Layout.astro` con metadatos extendidos y Schema básico.
3. Inyectar Schema específico en cada página de servicio.
4. Revisar la semántica HTML en todos los componentes.
