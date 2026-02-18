# Propuesta de Sitemap — Jiménez Degante

Este documento define la estructura de navegación y distribución de contenido para el nuevo sitio web, basado en el análisis del sitio actual (WordPress).

---

## 🏗 Estructura de Navegación Principal

El menú principal se mantendrá fiel a la identidad actual pero con una organización más limpia y moderna.

1. **Inicio** (`/`)
2. **Obras** (`/obras`)
3. **Trámites Mercantiles** (`/tramites-mercantiles`)
4. **Trámites en General** (`/tramites-generales`)
5. **Ubicación** (`/ubicacion`)

---

## 📄 Detalle por Página

### 1. Inicio (`src/pages/index.astro`)
**Objetivo:** Presentación institucional, autoridad y resumen de servicios.

*   **Hero Section:**
    *   Título principal: "¿Los Documentos de sus Obras y de su negocio están en regla?"
    *   Subtítulo: "Consultoría y Tramitología Integral desde hace más de 25 años."
    *   **CTA Principal:** "Contáctanos" (lleva a footer o sección de contacto).
*   **¿Quiénes Somos?:** Breve introducción sobre la experiencia y capacidad técnica del despacho.
*   **Nuestras Áreas (Resumen):**
    *   Cards o Grid visual para "Obras en General" y "Establecimientos Mercantiles".
*   **Clientes Destacados:** Carrusel o grid de logotipos (Mobil, Burger Boy, Gandhi, etc.) para generar confianza.
*   **Certificaciones (Responsivas):**
    *   Lista destaca de credenciales: DRO, C/DUYA, C/SE, C/I, PDU.

### 2. Obras (`src/pages/obras.astro`)
**Objetivo:** Desglosar servicios técnicos de construcción y arquitectura.

*   **Sección: Trámites y Gestorías**
    *   Lista detallada: Constancias, Manifestaciones (A, B, C), Licencias especiales, Regularizaciones, Visto Bueno, etc.
*   **Sección: Proyecto y Diseño**
    *   Servicios: Obra nueva, Ampliaciones, Remodelaciones, Publicitación vecinal.
*   **Sección: Servicios Complementarios**
    *   Servicios técnicos: Levantamientos topo/arq, Cálculo estructural, Dictámenes de seguridad, Instalaciones (Hidrosanitaria/Eléctrica).

### 3. Trámites Mercantiles (`src/pages/tramites-mercantiles.astro`)
**Objetivo:** Servicios para negocios y establecimientos comerciales.

*   **Sección: Gestión de Establecimientos**
    *   Uso de Suelo, Aperturas, Traspasos, Licencias de Funcionamiento, Enseres.
*   **Sección: Protección Civil**
    *   Programas de PC, Responsivas eléctricas y estructurales.
*   **Sección: Legal y Verificaciones**
    *   Defensa ante clausuras, Contestación de verificaciones (INVEA/COFEPRIS/PROFECO), Juicios de nulidad.

### 4. Trámites en General (`src/pages/tramites-generales.astro`)
**Objetivo:** Gestoría administrativa especializada.

*   **Sección: SEDUVI**
    *   Certificados de Uso de Suelo, Sig, Estudios de Impacto Urbano.
*   **Sección: Patrimonio (INBA / INAH)**
    *   Gestión para inmuebles catalogados o en zonas patrimoniales.
*   **Sección: Medio Ambiente (SEDEMA/SACMEX)**
    *   Impacto ambiental, Factibilidad de servicios, Reuso de agua.

### 5. Ubicación (`src/pages/ubicacion.astro`)
**Objetivo:** Contacto directo y localización física.

*   **Información de Contacto:**
    *   Dirección completa: Plaza Buenavista No 2 - 306, Col. Guerrero.
    *   Teléfonos y Correos (con enlaces activos `tel:` y `mailto:`).
*   **Mapa Interactivo:** Embed de Google Maps.
*   **Formulario de Contacto:** (Opcional, recomendado para modernizar la captura de leads).

---

## 🎨 Componentes Globales

*   **Header:** Logotipo actualizado, navegación responsive (menú hamburguesa en móvil).
*   **Footer:**
    *   Datos de contacto rápidos.
    *   Enlaces legales (Aviso de Privacidad - pendiente confirmar contenido).
    *   Copyright actualizado.
*   **Botón Flotante (Opcional):** WhatsApp o Teléfono para contacto rápido en móvil.

