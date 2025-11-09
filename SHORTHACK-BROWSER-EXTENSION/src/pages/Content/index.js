console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Function to extract page context (projectId, trackerId, specificationItemId)
function extractPageContext() {
    const pageText = document.body.innerHTML;
    
    // Extract Project ID from [PROJ:xxxxx] pattern
    const projMatch = pageText.match(/\[PROJ:(\d+)\]/);
    const projectId = projMatch ? projMatch[1] : null;
    
    // Extract Tracker ID from [TRACKER:xxxxx] pattern
    const trackerMatch = pageText.match(/\[TRACKER:(\d+)\]/);
    const trackerId = trackerMatch ? trackerMatch[1] : null;
    
    // Extract Specification Item ID from [ISSUE:xxxxx] pattern
    const issueMatch = pageText.match(/\[ISSUE:(\d+)\]/);
    const specificationItemId = issueMatch ? issueMatch[1] : null;

    let context = { projectId, trackerId, specificationItemId };
    console.log('Codebeamer Assistant: Extracted page context:', context);
    return context;
}

// Function to send page context data to sidepanel
function sendPageContextToSidepanel() {
    console.log('Codebeamer Assistant: Extracting page context...');
    const pageContext = extractPageContext();
    chrome.runtime.sendMessage({
        type: 'page_context_updated',
        data: pageContext,
        url: window.location.href,
        timestamp: Date.now()
    }).catch((error) => {
        console.error('Codebeamer Assistant: Error sending message to sidepanel:', error);
    }).finally(() => {
        console.log('Codebeamer Assistant: Page context sent to sidepanel');
    });
}



// Initial scan - wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        sendPageContextToSidepanel();
    });
} else {
    sendPageContextToSidepanel();
}

// Also scan when page is fully loaded
if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            sendPageContextToSidepanel();
        }, 500);
    });
}

// Set up MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
    // Debounce the update to avoid too many rapid calls
    clearTimeout(window.pageContextUpdateTimeout);
    window.pageContextUpdateTimeout = setTimeout(sendPageContextToSidepanel, 100);
});

// Start observing
observer.observe(document, {
    childList: true,
    subtree: true
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'get_page_context') {
        const pageContext = extractPageContext();
        sendResponse({
            data: pageContext,
            url: window.location.href,
            timestamp: Date.now()
        });
    } else if (message.type === 'reload_page') {
        console.log('Codebeamer Assistant: Reloading page...');
        window.location.reload();
    }
});

console.log('Page context scanner initialized');
