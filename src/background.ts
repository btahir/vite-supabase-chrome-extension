import browser from "webextension-polyfill";
import supabase from './supabase-client';

function log(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}`;
  
  chrome.storage.local.get(['logs'], (result) => {
    const logs = result.logs || [];
    logs.push(logMessage);
    chrome.storage.local.set({ logs: logs.slice(-100) }); // Keep last 100 logs
  });

  console.log(logMessage);
}

async function handleMessage(request: any, sender: any, sendResponse: any) {
  log(`Received message with action: ${request.action}`);

  if (request.action === 'signIn') {
    const manifest = chrome.runtime.getManifest();
    const redirectURL = chrome.identity.getRedirectURL();
    const clientId = manifest.oauth2?.client_id
    const scopes = manifest.oauth2?.scopes;

    log(`Redirect URL: ${redirectURL}`);
    log(`Client ID: ${clientId}`);
    log(`Scopes: ${scopes?.join(', ')}`);

    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('client_id', manifest.oauth2?.client_id as string);
    url.searchParams.set('response_type', 'id_token');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('redirect_uri', `https://${chrome.runtime.id}.chromiumapp.org`);
    url.searchParams.set('scope', manifest.oauth2?.scopes?.join(' ') as string);

    log(`Auth URL: ${url.toString()}`);

    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {
        if (chrome.runtime.lastError) {
          log(`Error in launchWebAuthFlow: ${JSON.stringify(chrome.runtime.lastError)}`);
          sendResponse({ error: chrome.runtime.lastError });
        } else if (!redirectedTo) {
          log('No redirectedTo URL received');
          sendResponse({ error: 'Authentication failed' });
        } else {
          log(`Redirected to: ${redirectedTo}`);
          // ... rest of your code
        }
      }
    );
    return true; // Indicates that the response is sent asynchronously
  } else if (request.action === 'signOut') {
    log('Signing out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      log(`Sign-out error: ${error.message}`);
    } else {
      log('Successfully signed out');
    }
    sendResponse({ error });
  } else if (request.action === 'getUser') {
    log('Getting user');
    const { data: { user } } = await supabase.auth.getUser();
    log(`User retrieved: ${user ? 'Yes' : 'No'}`);
    sendResponse(user);
  } else if (request.action === 'getLogs') {
    chrome.storage.local.get(['logs'], (result) => {
      sendResponse({ logs: result.logs || [] });
    });
    return true; // for asynchronous response
  }
}

browser.runtime.onMessage.addListener(handleMessage);

log('Background script initialized');