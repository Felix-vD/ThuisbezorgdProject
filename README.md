# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


```Project Related
# StickerSmash Tracking App

A cross‑platform mobile app built with React Native and Expo. It tracks user location in the background (Expo Location + Task Manager) and uses Supabase for authentication and data storage.

> ⚠️ **Note:** All development work lives on the `feature-branch`. Be sure to check out that branch after cloning.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Getting Started](#getting-started)  
5. [Testing on Device](#testing-on-device)  
6. [Folder Structure](#folder-structure)  
7. [Contributing](#contributing)  
8. [License](#license)  

---

## Features

- Email/password authentication via Supabase  
- Background location tracking (expo-location + expo-task-manager)  
- Profile management (view & edit)  
- Bottom‑tab navigator (Orders/About, Profile)  
- Auto‑refreshing Supabase session on app focus  

---

## Tech Stack

- React Native (TypeScript)  
- Expo (managed workflow)  
- `expo-location` & `expo-task-manager`  
- `@supabase/supabase-js` (v2)  
- React Navigation (native stack + bottom tabs)  
- Node.js & npm/Yarn  

---

## Prerequisites

- **Node.js** v16+  
- **npm** v8+ or **Yarn**  
- **expo-cli** (global)  
- A **Supabase** project (URL + anon key)  
- An **Expo** account (for Expo Go testing)  

---

## Getting Started

### 1. Clone & Switch Branch  
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
git fetch
git checkout feature-branch
