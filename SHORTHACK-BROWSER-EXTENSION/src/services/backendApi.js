/**
 * Backend API Service for interacting with HTTP Server
 * Handles all API requests to the http_server.py backend with Microsoft authentication
 */

import { getAccessToken, isAuthenticated, login } from './authService';

const HTTP_API_ENDPOINT = process.env.REACT_APP_HTTP_API_ENDPOINT;

/**
 * Helper function to make authenticated API requests
 * @param {string} endpoint - API endpoint path (e.g., '/api/validate')
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Object>} Response data
 */
async function makeApiRequest(endpoint, options = {}) {
  try {
    if (!HTTP_API_ENDPOINT) {
      throw new Error(
        'HTTP_API_ENDPOINT is not configured in environment variables'
      );
    }

    const url = `${HTTP_API_ENDPOINT}${endpoint}`;
    console.log(`API Request: ${options.method || 'GET'} ${url}`);

    // Check if user is authenticated
    if (!isAuthenticated()) {
      console.warn('User not authenticated, attempting login...');
      try {
        await login();
      } catch (loginError) {
        throw new Error(
          'Authentication required. Please log in with your Microsoft account.'
        );
      }
    }

    // Get access token
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error(
        'Failed to obtain access token. Please try logging in again.'
      );
    }

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}` +
          (errorData.detail ? ` - ${JSON.stringify(errorData.detail)}` : '')
      );
    }

    const data = await response.json();
    console.log('API request completed successfully:', data);

    return data;
  } catch (error) {
    console.error(`Error during API request to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Validate a specification against regulations using Azure AI
 * @param {number} specificationItemId - The ID of the specification item to validate
 * @returns {Promise<Object>} Validation results including compliance status
 */
export async function validateSpecification(specificationItemId) {
  console.log(`Validating specification item: ${specificationItemId}`);

  return makeApiRequest('/api/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      specification_item_id: specificationItemId,
    }),
  });
}

/**
 * Retrieve the last validation result for a specification from cache
 * @param {number} specificationItemId - The ID of the specification item
 * @returns {Promise<Object>} Cached validation results or empty result if not found
 */
export async function getLastValidationResult(specificationItemId) {
  console.log(
    `Retrieving last validation result for specification item: ${specificationItemId}`
  );

  return makeApiRequest(`/api/validate/last/${specificationItemId}`, {
    method: 'GET',
  });
}

/**
 * Update the description of a tracker item
 * @param {number} itemId - The ID of the tracker item to update
 * @param {string} description - The new description text
 * @param {string} descriptionFormat - Format of the description ('Wiki' or 'Plain')
 * @returns {Promise<Object>} Updated tracker item information
 */
export async function updateItemDescription(
  itemId,
  description,
  descriptionFormat = 'Wiki'
) {
  console.log(`Updating description for item: ${itemId}`);

  return makeApiRequest('/api/items/description', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
      description: description,
      description_format: descriptionFormat,
    }),
  });
}

/**
 * Get a specific tracker item
 * @param {number} itemId - The ID of the tracker item to retrieve
 * @param {number} [version] - Optional version of the tracker item
 * @param {number} [baselineId] - Optional baseline ID
 * @returns {Promise<Object>} Tracker item information
 */
export async function getTrackerItem(
  itemId,
  version = null,
  baselineId = null
) {
  console.log(`Getting tracker item: ${itemId}`);

  const queryParams = new URLSearchParams();
  if (version !== null) queryParams.append('version', version);
  if (baselineId !== null) queryParams.append('baseline_id', baselineId);

  const queryString = queryParams.toString();
  const endpoint = `/api/items/${itemId}${
    queryString ? `?${queryString}` : ''
  }`;

  return makeApiRequest(endpoint, {
    method: 'GET',
  });
}

/**
 * Check health status of the HTTP server
 * @returns {Promise<Object>} Health check response
 */
export async function checkHealth() {
  console.log('Checking server health');

  return makeApiRequest('/health', {
    method: 'GET',
  });
}

/**
 * Get API information from the HTTP server
 * @returns {Promise<Object>} API information
 */
export async function getApiInfo() {
  console.log('Getting API info');

  return makeApiRequest('/', {
    method: 'GET',
  });
}
