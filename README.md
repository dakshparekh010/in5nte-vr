<div align="center">

# IN5NITE VR

**India's first Free Roam VR Multiplayer Gaming Arcade**  
**with Full Body Tracking — Surat, Gujarat.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Status: Live](https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logo=vercel)](https://in5nite-vr.netlify.app)

[🌐 Visit Live Site → https://in5nite-vr.netlify.app](https://in5nite-vr.netlify.app)

</div>

---

## 🎮 About The Project

In5nite VR is India's first Free Roam VR Multiplayer 
Gaming Arcade with Full Body Tracking. This is the 
official business website built to showcase their 
experiences, drive bookings, and establish their 
premium brand identity online.

**Founded:** 2021  
**Location:** UG-1 Canal Walk Shoppers, Vesu, Surat 395007  
**Live URL:** https://in5nite-vr.netlify.app  

The website features an Apple-style scroll-linked 
canvas frame sequence animation as the hero section, 
glassmorphism UI, Framer Motion animations, and a 
fully responsive premium dark neon design.

---

## 📸 Screenshots

![Hero Section](./screenshots/hero-section.png)
> 🎬 Hero Section — Scroll Animation

![Why IN5NITE VR](./screenshots/why-in5nite-vr.png)
> ⭐ Why IN5NITE VR — Features Section

![Our Experiences](./screenshots/our-experiences.png)
> 🎮 Our Experiences — Games Section

![Contact & Booking](./screenshots/contact-booking.png)
> 📍 Contact & Booking Section

*Screenshots can be added to /screenshots folder*

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| **✅ Apple-style Scroll Animation** | Canvas frame sequence animation synced to scroll, 30fps PNG frames, smooth chapter transitions. |
| **✅ Full Body Tracking Showcase** | Premium cards highlighting In5nite VR's unique full body tracking technology. |
| **✅ Multiplayer Experience Cards** | 6 experience cards with cinematic images, hover effects, and booking CTAs. |
| **✅ Online Booking Form** | Built-in session booking form with name, phone, date, time, players, experience type. |
| **✅ WhatsApp Integration** | Direct WhatsApp booking link with pre-filled message for instant confirmation. |
| **✅ Glassmorphism UI** | Premium dark glassmorphism cards with neon glow hover effects throughout. |
| **✅ Framer Motion Animations** | Smooth scroll-triggered animations with stagger effects on all section entries. |
| **✅ Fully Responsive** | Mobile-first design that works perfectly on all screen sizes and devices. |
| **✅ SEO Optimized** | Complete metadata, OpenGraph tags, favicon, and page title optimization. |
| **✅ Stats Section** | Animated number showcase for founding year, team size, first-in-India status, and city. |

---

## 🗂️ Website Sections

| Section | Description |
| :--- | :--- |
| `#home` | Hero with scroll-linked canvas animation |
| `#why-us` | Why IN5NITE VR — 6 feature cards |
| `#games` | Our Experiences — 6 experience cards |
| `#stats` | By The Numbers — key stats |
| `#contact` | Booking form + address + contact links |
| `Footer` | Links, social media, copyright |

---

## 🛠️ Built With

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Canvas** | HTML5 Canvas (frame sequence) |
| **Fonts** | Orbitron (headings) + Inter (body) |
| **Deployment** | Netlify |
| **Version Control** | Git + GitHub |
| **Node Version** | 20.20.0+ |

---

## 🎨 Brand Colors

| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Background** | `#030308` | Main background |
| **Secondary** | `#07070F` | Card backgrounds |
| **Cyan** | `#22d3ee` | Primary accent |
| **Purple** | `#a855f7` | Secondary accent |
| **Pink** | `#ec4899` | Tertiary accent |
| **White** | `#F2F2F2` | Body text |

---

## 📁 Project Structure

```text
in5nite-vr/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── HeroCanvas.tsx
│   ├── Features.tsx
│   ├── Experiences.tsx
│   ├── Stats.tsx
│   ├── Location.tsx
│   └── Footer.tsx
├── public/
│   ├── frames/
│   │   └── in5nite-vr/
│   │       └── frame_0001.png ...
│   ├── images/
│   │   └── experiences/
│   └── favicon.ico
├── netlify.toml
├── next.config.js
└── package.json
```

---

## 🚀 Getting Started

Prerequisites:
- Node.js >= 20.9.0
- npm

```bash
# Clone the repository
git clone https://github.com/dakshparekh010/in5nte-vr

# Navigate to project
cd in5nte-vr

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:3000

---

## 🌐 Deployment

Deployed on Netlify:
- Auto deploys from GitHub main branch
- Next.js Runtime v5 detected automatically
- Node.js version: 20.20.0
- Build command: `npm run build`
- Publish directory: `.next`
- Live at: https://in5nite-vr.netlify.app

---

## 🎯 Why This Project Stands Out

- **🎬 Apple-style Canvas Animation**
  Scroll-linked frame sequence using HTML5 Canvas with 30fps PNG frames, COVER scaling, and smooth chapter text transitions — built from scratch.

- **🎨 Premium Design System**
  Custom dark neon color palette with glassmorphism cards, radial glow hover effects, and cinematic Framer Motion animations throughout.

- **📱 Mobile-First Responsive**
  Every section adapts perfectly to all screen sizes with responsive grids, typography, and touch-friendly interactive elements.

- **⚡ Performance Optimized**
  Frame preloading with progress bar, lazy animations with whileInView, and optimized Next.js build for fast page loads.

- **🎮 Business-Focused UX**
  Every CTA guides users toward booking — from hero buttons to card clicks to WhatsApp integration — maximizing conversion for the arcade business.

---

## 📬 Get in Touch

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dakshparekh42@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daksh-parekh-97ab68313/)

<div align="center">
  <br />
  <i>Designed & Developed with ❤️ using Next.js</i>
</div>
