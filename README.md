# You-TLDR Chrome Extension

This project is a Chrome extension that provides a TLDR (Too Long; Didn't Read) summary for YouTube videos. It's built with React, TypeScript, and Vite.

## Setup

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   VITE_OAUTH_CLIENT_ID=your_oauth_client_id
   ```
   Replace the placeholder values with your actual Supabase project URL, anon key, and OAuth 2.0 client ID.

4. Update the `src/assets/manifest.json` file:
   The `oauth2.client_id` field will be automatically replaced with the value from your `.env.local` file during the build process.

## Development

To run the project in development mode:

```
npm run dev
```

This will start a development server, typically at `http://localhost:5173`.

## Building the Extension

To build the extension for production:

```
npm run build
```

This will create a `dist` folder with the built extension files.

## Loading the Extension in Chrome

1. Open Google Chrome and navigate to `chrome://extensions`.

2. Enable "Developer mode" by toggling the switch in the top right corner.

3. Click on "Load unpacked" button.

4. Navigate to your project's `dist` folder and select it.

5. The extension should now be loaded and visible in your Chrome browser.

Remember to rebuild the extension and reload it in Chrome whenever you make changes to the code.

## Project Structure

- `src/`: Contains the source code for the extension
  - `components/`: React components
  - `assets/`: Static assets including the manifest file
  - `background.ts`: Background script for the extension
  - `App.tsx`: Main React component
  - `main.tsx`: Entry point for the React app
- `vite.config.ts`: Vite configuration file
- `tsconfig.app.json`: TypeScript configuration for the app
- `package.json`: Project dependencies and scripts

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run lint`: Runs the linter
- `npm run preview`: Locally preview the production build

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
