/**
 * Microsoft Authentication Service for Browser Extension
 * Handles MSAL authentication for Chrome extension
 */

// MSAL configuration
const ENTRA_CLIENT_ID = process.env.REACT_APP_ENTRA_CLIENT_ID;
const ENTRA_TENANT_ID = process.env.REACT_APP_ENTRA_TENANT_ID || 'organizations';
const API_SCOPE = process.env.REACT_APP_API_SCOPE || `api://${ENTRA_CLIENT_ID}/access_as_user`;

// Storage keys
const STORAGE_KEYS = {
    ACCESS_TOKEN: 'msal_access_token',
    TOKEN_EXPIRY: 'msal_token_expiry',
    USER_INFO: 'msal_user_info'
};

/**
 * Initialize authentication (call this when the extension loads)
 */
export async function initAuth() {
    console.log('Initializing Microsoft authentication...');
    
    if (!ENTRA_CLIENT_ID) {
        console.error('REACT_APP_ENTRA_CLIENT_ID is not configured');
        return false;
    }
    
    // Check if we have a valid cached token
    const cachedToken = await getCachedToken();
    if (cachedToken) {
        console.log('Valid cached token found');
        return true;
    }
    
    console.log('No valid cached token found');
    return false;
}

/**
 * Check if user is authenticated with a valid token
 * @returns {boolean} True if authenticated
 */
export function isAuthenticated() {
    const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    
    if (!accessToken || !tokenExpiry) {
        return false;
    }
    
    // Check if token is expired (with 5 minute buffer)
    const expiryTime = parseInt(tokenExpiry, 10);
    const now = Date.now();
    const bufferMs = 5 * 60 * 1000; // 5 minutes
    
    return now < (expiryTime - bufferMs);
}

/**
 * Get cached token if valid
 * @returns {Promise<string|null>} Access token or null
 */
async function getCachedToken() {
    if (isAuthenticated()) {
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
    return null;
}

/**
 * Login with Microsoft account using Chrome Identity API
 * @returns {Promise<Object>} User info and token
 */
export async function login() {
    console.log('Starting Microsoft login flow...');
    
    if (!ENTRA_CLIENT_ID) {
        throw new Error('Entra Client ID is not configured. Please set REACT_APP_ENTRA_CLIENT_ID in environment variables.');
    }
    
    try {
        // Build authorization URL
        const authUrl = buildAuthUrl();
        console.log('Authorization URL:', authUrl);
        
        // Launch Chrome identity flow
        const redirectUrl = await new Promise((resolve, reject) => {
            chrome.identity.launchWebAuthFlow(
                {
                    url: authUrl,
                    interactive: true
                },
                (responseUrl) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve(responseUrl);
                    }
                }
            );
        });
        
        console.log('Received redirect URL');
        
        // Extract tokens from redirect URL
        const tokens = extractTokensFromUrl(redirectUrl);
        
        if (!tokens.accessToken) {
            throw new Error('No access token received from authentication flow');
        }
        
        if (!tokens.idToken) {
            throw new Error('No ID token received from authentication flow');
        }
        
        // Store tokens
        storeTokens(tokens);
        
        // Get user info from ID token
        const userInfo = await getUserInfo(tokens.accessToken, tokens.idToken);
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
        
        console.log('Login successful for user:', userInfo.displayName);
        
        return {
            accessToken: tokens.accessToken,
            userInfo: userInfo
        };
        
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

/**
 * Logout and clear stored tokens
 */
export async function logout() {
    console.log('Logging out...');
    
    // Clear stored tokens
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    
    console.log('Logout complete');
}

/**
 * Get access token (login if needed)
 * @returns {Promise<string>} Access token
 */
export async function getAccessToken() {
    // Check if we have a valid cached token
    const cachedToken = await getCachedToken();
    if (cachedToken) {
        return cachedToken;
    }
    
    // No valid token, need to login
    console.log('No valid token found, initiating login...');
    const result = await login();
    return result.accessToken;
}

/**
 * Get current user information
 * @returns {Object|null} User info or null if not authenticated
 */
export function getCurrentUser() {
    const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (!userInfoStr) {
        return null;
    }
    
    try {
        return JSON.parse(userInfoStr);
    } catch (error) {
        console.error('Failed to parse user info:', error);
        return null;
    }
}

/**
 * Build authorization URL for Microsoft login
 * @returns {string} Authorization URL
 */
function buildAuthUrl() {
    const redirectUri = chrome.identity.getRedirectURL();
    const state = generateRandomString(32);
    const nonce = generateRandomString(32);
    
    const params = new URLSearchParams({
        client_id: ENTRA_CLIENT_ID,
        response_type: 'token id_token',
        redirect_uri: redirectUri,
        scope: `openid profile email ${API_SCOPE}`,
        response_mode: 'fragment',
        state: state,
        nonce: nonce,
        prompt: 'select_account'
    });
    
    return `https://login.microsoftonline.com/${ENTRA_TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
}

/**
 * Extract tokens from redirect URL
 * @param {string} url - Redirect URL with tokens in fragment
 * @returns {Object} Tokens object
 */
function extractTokensFromUrl(url) {
    const fragment = url.split('#')[1];
    if (!fragment) {
        throw new Error('No fragment found in redirect URL');
    }
    
    const params = new URLSearchParams(fragment);
    
    return {
        accessToken: params.get('access_token'),
        idToken: params.get('id_token'),
        expiresIn: params.get('expires_in'),
        tokenType: params.get('token_type')
    };
}

/**
 * Store tokens in localStorage
 * @param {Object} tokens - Tokens object
 */
function storeTokens(tokens) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    
    // Calculate expiry time
    const expiresInMs = parseInt(tokens.expiresIn || '3600', 10) * 1000;
    const expiryTime = Date.now() + expiresInMs;
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
}

/**
 * Get user information from ID token claims
 * @param {string} accessToken - Access token (unused but kept for compatibility)
 * @param {string} idToken - ID token with user claims
 * @returns {Promise<Object>} User information
 */
async function getUserInfo(accessToken, idToken) {
    try {
        // Decode ID token to get user claims
        // ID token format: header.payload.signature
        const payload = idToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        
        return {
            displayName: decodedPayload.name || 'User',
            email: decodedPayload.email || decodedPayload.preferred_username || 'unknown',
            id: decodedPayload.oid || decodedPayload.sub
        };
    } catch (error) {
        console.warn('Failed to decode ID token:', error);
        // Return basic info if decoding fails
        return {
            displayName: 'User',
            email: 'unknown'
        };
    }
}

/**
 * Generate random string for state/nonce
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    
    for (let i = 0; i < length; i++) {
        result += charset[values[i] % charset.length];
    }
    
    return result;
}
