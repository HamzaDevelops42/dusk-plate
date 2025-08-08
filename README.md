# 🍽️ DuskPlate – Elegant Dining Experience Website

A modern, responsive restaurant website built with **Next.js 14 App Router**, **TypeScript**, and **Sanity CMS**. It features a dynamic menu system categorized into sections, mobile-first UI, real-time CMS integration, and a cart powered by the React Context API.

---

## ✨ Features

- Dynamic restaurant name via `.env` variable
- Fully responsive UI
- Category-based menu with subcategories and images
- Smooth user experience with scrollable menus
- Integrated cart system using Context API
- CMS-driven content from Sanity.io
- Easy to configure and deploy for any restaurant

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Content Management**: Sanity CMS
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/HamzaDevelops42/dusk-plate.git
cd duskplate
npm install
```

Make sure to fill in your `.env` file as shown below.

---

## 🛠️ Scripts

- `npm run dev` – Starts the development server
- `npm run build` – Builds the application
- `npm run start` – Starts the production build

---

## 🌐 Environment Variables

Create a `.env` file in the root of your project:

```env
NAME="DuskPlate" # Only used for site title, metadata, and branding

NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
NEXT_PUBLIC_SANITY_API_VERSION=your_api_version
NEXT_PUBLIC_SANITY_USE_CDN=true_or_false
```

---

## 🧠 Sanity CMS Setup

Only the `schemas` folder is required for this project.

### To deploy your schema to Sanity:

```bash
cd sanity
sanity deploy
sanity dataset import production
```

Ensure you are logged into Sanity and have initialized your project before deploying.

---

## 🪪 License

This project is licensed under the **MIT License**.