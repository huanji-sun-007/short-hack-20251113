/**
 * Direct Line Service for connecting to Azure Bot Service
 * Handles token generation and Direct Line connection setup
 */

const DIRECT_LINE_SECRET = process.env.REACT_APP_AZURE_BOT_DIRECT_LINE_SECRET;
const DIRECT_LINE_ENDPOINT = 'https://directline.botframework.com/v3/directline/tokens/generate';

/**
 * Generate a Direct Line token from the Azure Bot Service
 * @returns {Promise<string>} Direct Line token
 */
export async function generateDirectLineToken() {
    try {
        console.log('Generating Direct Line token for Azure Bot...');
        
        const response = await fetch(DIRECT_LINE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIRECT_LINE_SECRET}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Optional: can include user info
                // User: {
                //     Id: 'user-id',
                //     Name: 'User Name'
                // }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to generate Direct Line token: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Direct Line token generated successfully');
        
        return data.token;
    } catch (error) {
        console.error('Error generating Direct Line token:', error);
        throw error;
    }
}

/**
 * Create Direct Line connection with token
 * @param {string} token Direct Line token
 * @returns {object} Direct Line connection
 */
export function createDirectLineConnection(token) {
    return {
        token: token,
        domain: 'https://directline.botframework.com/v3/directline',
        webSocket: true
    };
}