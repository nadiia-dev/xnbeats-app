# XNBeats

**XNBeats** is a full-stack web application where users can explore, rate, and review beats. The app includes authentication, role-based access, and admin features. Built with React, Firebase, and Cloudinary.

## ✨ Features

- 🔐 User authentication (sign up / log in)
- 🔎 Browse and preview posts
- ⭐ Leave reviews and star ratings
- 🧑‍💼 Admin dashboard (protected routes)
- ☁️ Image upload via Cloudinary
- 🎛️ Responsive UI with MUI and Bootstarp

## 💠 Tech Stack

- **Frontend**: React, React Router, MUI, React Hook Form
- **Backend (as-a-service)**: Firebase Firestore, Firebase Auth
- **Media Hosting**: Cloudinary
- **Other tools**: Vite, ESLint, Prettier

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nadiia-dev/xnbeats-app.git
cd xnbeats-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

Create a `.env` file in the root folder and use the `.env.example` as a reference:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_CLOUD_NAME=your_cloudinary_cloud_name
VITE_PRESET_NAME=your_upload_preset
```

### 4. Run the project locally

```bash
npm run dev
```

## 🔐 Firebase Rules

This app uses Firestore security rules for role-based access.
