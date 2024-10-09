# Vite Supabase Chrome Extension Starter

A starter template for building a Chrome extension with Vite and Supabase.

## Quick Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   ```
   Replace placeholder values with your actual credentials.

3. Update the `manifest.json` file:
   - Locate the `manifest.json` file in the `public` directory.
   - Find the `oauth2` section and update the `client_id` field:
     ```json
     "oauth2": {
       "client_id": "__OAUTH_CLIENT_ID__",
       ...
     }
     ```
   - Replace `__OAUTH_CLIENT_ID__` with the value of `VITE_OAUTH_CLIENT_ID` from your `.env.local` file.

4. Run the development server:
   ```
   npm run dev
   ```

## Loading the Extension in Chrome

1. Go to `chrome://extensions/` in Chrome.
2. Enable "Developer mode" (top right).
3. Click "Load unpacked".
4. Select the `dist` folder in your project directory.

Remember to rebuild and reload the extension after making changes.

## Setting up Google OAuth for Chrome Extension

Source: https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=chrome-extensions

1. Go to the Google Cloud Console (https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to the "Credentials" page in the API & Services section.
4. Click "Create Credentials" and choose "OAuth client ID".
5. For the application type, select "Chrome extension".
6. Provide the extension's ID in the "Item ID" field. You can get this by:
   - Loading your extension in Chrome
   - Going to `chrome://extensions/`
   - Finding your extension and copying the ID shown there
7. Complete the OAuth consent screen setup if you haven't already.
8. Once created, you'll receive a client ID. Update your manifest.json file with this value.

## Configuring Supabase Google Provider

1. Go to your Supabase project dashboard.
2. Navigate to Authentication > Providers.
3. Find and enable the Google provider.
4. In the "Authorized Client IDs" section, add the OAuth client ID you created for your Chrome extension.

Note: You don't need to configure the full OAuth flow in the Supabase Dashboard for Chrome extensions.

## Project Overview

- Built with React, TypeScript, and Vite
- Uses Supabase for backend services
- Implements OAuth 2.0 for authentication

For more detailed information, check the source code and comments.
