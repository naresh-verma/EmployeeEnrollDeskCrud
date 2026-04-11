# vue-project

A Vue 3 + Vite application using Quasar, Pinia, and Vue Router to manage users and role registrations.

## Overview

This project includes:

- User management with add / edit / delete operations
- A data table for user records
- Multi-step role registration dialog with review and submit flows
- Pinia stores for users and role registrations
- Vue Router navigation between user list and form pages
- Quasar UI components for layout, forms, dialogs, and tables

## Tech Stack

- Vue 3 (beta)
- Vite
- Quasar Framework
- Pinia
- Vue Router
- Vitest for unit testing

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official) extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Recommended Browser Setup

- Chromium-based browsers: use Vue.js devtools
- Firefox: use Vue.js devtools

## Project Structure

- `src/App.vue` — main app layout and router view
- `src/main.js` — Vue app bootstrap with Pinia and Quasar
- `src/router/index.js` — routes for user list and user form
- `src/views/UserList.vue` — user table, actions, and role registration dialog
- `src/views/UserForm.vue` — add / edit user form
- `src/stores/user.js` — Pinia store for user CRUD
- `src/stores/roleRegistry.js` — Pinia store for role registrations
- `src/composables/useUserManagement.js` — user table actions and deletion handling
- `src/composables/useRoleRegistration.js` — multi-step role registration dialog flow
- `src/components/RoleRegistrationForm.vue` — role registration form step
- `src/components/RoleRegistrationReview.vue` — role registration review step

## Project Setup

Install dependencies:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview the Production Build

```sh
npm run preview
```

### Run Unit Tests

```sh
npm run test:unit
```

## Notes

- The app uses Quasar CSS and Material Icons from `@quasar/extras`.
- The user store keeps data in memory, so page refresh will reset users.
- Role registrations are stored in a separate Pinia store and linked to users by `userId`.
