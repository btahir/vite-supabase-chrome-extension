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
   VITE_OAUTH_CLIENT_ID=your_oauth_client_id
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

## Project Overview

- Built with React, TypeScript, and Vite
- Uses Supabase for backend services
- Implements OAuth 2.0 for authentication

For more detailed information, check the source code and comments.
