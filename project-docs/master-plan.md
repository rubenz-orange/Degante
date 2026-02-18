# Master Plan: Jiménez de Gante Modernization

**Objective:** Migrate existing WordPress site (jimenezdegante.com) to a modern, high-performance stack using Astro and Tailwind CSS.

## 1. Project Overview
The goal is to replace the current WordPress site with a static/hybrid site built with Astro. This will improve performance, security, and maintainability. The design will be modernized using Tailwind CSS while retaining the professional and corporate identity of the firm.

## 2. Technical Stack
- **Framework:** Astro (latest version)
- **Styling:** Tailwind CSS
- **Deployment:** Static hosting (or PHP server if dynamic features needed, likely static for this content).
- **Asset Management:** Images/files to be migrated from current server via FTP.

## 3. Site Structure & Content
Based on the analysis of the live site, the new site will reproduce the following structure:

### A. Inicio (Home)
- **Content:**
  - Introduction to the firm.
  - Value proposition: 25+ years experience, technical consulting (DRO, Perito).
  - Main call-to-actions.

### B. Obras (Works)
- **Services:**
  - Gestoría & Trámites (Construction permits).
  - Perito Responsibilities (DRO, C/DUYA, C/SE, C/I, PDU).
  - Architectural Design & Construction.
  - Regularization of constructions.

### C. Trámites Mercantiles (Mercantile Procedures)
- **Services:**
  - Land Use (Zonificación).
  - Business Opening & Transfers (Apertura/Traspaso).
  - Operating Licenses/Impact Studies.
  - Parking Lot permits.
  - Civil Protection Programs & Training.
  - Health Notices (COFEPRIS).
  - Legal Defense (Clausuras, sellos).

### D. Trámites en General (General Procedures)
- General administrative consulting and management.

### E. Ubicación (Location/Contact)
- **Details:**
  - Address: Plaza Buenavista No 2 - 306, Col. Guerrero, CDMX.
  - Phones: 5546 9274, 5535 3329.
  - Email: degantearquitectos@yahoo.com.mx.
  - Map integration (Google Maps embed).

## 4. Implementation Strategy

### Phase 1: Setup & Configuration
- [ ] Initialize Astro project in the root directory.
- [ ] Install and configure Tailwind CSS.
- [ ] Set up project structure (components, layouts, pages).
- [ ] Create `.env.local` for sensitive data (FTP keys) and add to `.gitignore`.

### Phase 2: Asset Retrieval
- [ ] Connect via FTP to download existing images and documents.
- [ ] Optimize assets for the new site.

### Phase 3: Development
- **Layouts:**
  - [ ] Create a main layout with responsive Header (Navigation) and Footer.
- **Components:**
  - [ ] Build reusable UI components (Hero, ServiceCard, ContactForm, Map).
- **Pages:**
  - [ ] Implement Home (Inicio)
  - [ ] Implement Works (Obras)
  - [ ] Implement Mercantile Procedures (Trámites Mercantiles)
  - [ ] Implement General Procedures (Trámites en General)
  - [ ] Implement Location (Ubicación)
- **Styling:**
  - [ ] Apply modern, professional aesthetics with Tailwind.

### Phase 4: Verification & Deployment
- [ ] Review all content against the original site.
- [ ] Test responsiveness on mobile and desktop.
- [ ] Deployment: Upload the built static files to the server.

## 5. Requirements from User
- **FTP Credentials:** Host, Username, Password, Port (to download assets).
