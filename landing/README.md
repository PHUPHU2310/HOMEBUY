# HOMEBUY Landing Page

A beautiful landing page for the HOMEBUY real estate platform built with React.

## Features

- 🏠 Responsive design with mobile support
- 🌍 Multilingual support (Vietnamese, English, Chinese)
- 🎨 Modern UI with green color scheme
- ✉️ Contact form functionality
- 📱 Mobile-friendly navigation
- 🚀 Link to main application

## Project Structure

```
landing/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components (Header, Footer)
│   ├── pages/          # Page components (Home, Contact)
│   ├── locales/        # Translation files (vi, en, zh)
│   ├── App.js
│   ├── App.css
│   ├── i18n.js
│   └── index.js
├── package.json
└── README.md
```

## Installation

```bash
cd landing
npm install
```

## Development

```bash
npm start
```

Runs on `http://localhost:3001`

## Build

```bash
npm run build
```

## Pages

### Home
- Hero section with CTA button
- Features showcase (4 key benefits)
- About section with stats
- Call-to-action section

### Contact
- Contact information card
- Contact form with validation
- Success message feedback

## Translations

The site supports three languages:
- **Vietnamese (VI)** - Default
- **English (EN)**
- **Chinese (ZH)**

Language can be switched via language selector in header.

## Technology Stack

- React 18
- React Router v6
- react-i18next (i18n)
- Axios
- CSS3

## Connecting to Main App

The landing page links to the main real estate application at `http://localhost:3000`
