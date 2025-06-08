# 📹 Vidoom – Video Meeting App

**Vidoom** is a cross-platform video meeting application built with **Expo (Development Build)**, **React Native**, **Clerk**, and **GetStream.io**. It provides real-time video conferencing, scheduling, recordings, and user profile management, with a modular and reusable component architecture.

---

## ⚠️ Prerequisite

> 🚨 **Use development builds instead of Expo Go.**  
> The app uses native modules from **GetStream.io**, which are not supported in Expo Go.

Build a development client with:
```bash
npx expo run:android
# or
npx expo run:ios
```

---

## 📦 Tech Stack

- **Expo (React Native)** – Mobile development
- **React Navigation** – Stack & Drawer navigation
- **Clerk** – Authentication and user management
- **GetStream.io** – Video/audio streaming and recording
- **Next.js** – For secure Stream token generation (web + backend)
- **React Hook Form** – Forms with validation

---

## 🧭 Navigation Overview

### 🔁 Stack Navigator (Main)
- `/` – Main stack with:
  - `/(dashboard)` – Drawer navigator
  - `/profile` – Profile screen
  - `/meeting/[id]` – Dynamic meeting room

### 📂 Drawer Navigator (Inside Dashboard)
- `/dashboard` – Meeting overview
- `/recordings` – List of recorded meetings
- `/scheduled` – Upcoming scheduled meetings
- `/previous` – Past meetings history

---

## 🔐 Authentication (Clerk)

- SignUp / SignIn / Verification via Clerk
- Protected routing using `SignedIn` / `SignedOut`
- Email and social logins support

---

## 📹 Meetings & Streaming (Stream)

- Start and join real-time video meetings
- Record meetings and store in dashboard
- Meeting Types:
  - **Dashboard** – Live/Upcoming overview
  - **Scheduled** – Future events
  - **Previous** – Past meetings
  - **Recordings** – List of stored sessions

---

## 🔗 Stream Token Generation

> 🔐 Tokens are generated using a secure **Next.js** app deployed as part of the same project ecosystem.

🔗 **Next.js Stream Token App Repo**:  
[Vidoom - Video meeting app](https://github.com/HarpalSingh7395/vidoom)

This backend is also used to serve the **web version** of the app with the same logic.

## 🛠️ Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/vidoom-app.git
cd vidoom-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup environment variables
Create a `.env` file at the root:
```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
STREAM_API_KEY=your_stream_api_key
```

### 4. Run development build
```bash
npx expo run:android
# or
npx expo run:ios
```

---

## ✅ Planned Improvements

- [ ] In-app chat with GetStream Chat
- [ ] Push notifications for scheduled meetings
- [ ] Admin panel (web) for organization control
- [ ] Deep linking to join meetings directly
