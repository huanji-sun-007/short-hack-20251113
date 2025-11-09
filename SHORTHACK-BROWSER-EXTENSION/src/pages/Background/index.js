// Handle extension icon click to toggle side panel
chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id;
    await chrome.sidePanel.open({ tabId: tabId });
    console.log('Side panel opened for tab:', tabId);
});

// Track tab changes and notify sidepanel
chrome.tabs.onActivated.addListener((activeInfo) => {
    // Notify sidepanel that active tab has changed
    chrome.runtime.sendMessage({
        type: 'tab_changed',
        tabId: activeInfo.tabId,
        timestamp: Date.now()
    }).catch(() => {
        // Sidepanel might not be open
    });
});

// Track tab updates (like navigation within the same tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only notify on navigation complete
    if (changeInfo.status === 'complete') {
        chrome.runtime.sendMessage({
            type: 'tab_updated',
            tabId: tabId,
            url: tab.url,
            timestamp: Date.now()
        }).catch(() => {
            // Sidepanel might not be open
        });
    }
});

// Handle messages between content script and sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'page_context_updated') {
        console.log('Codebeamer Assistant: Received page context from content script for tab:', sender.tab?.id, message);
        // Forward the message to the sidepanel
        chrome.runtime.sendMessage({
            type: 'page_context_data',
            data: message.data,
            url: message.url,
            timestamp: message.timestamp,
            tabId: sender.tab?.id
        }).catch((error) => {
            console.error('Codebeamer Assistant: Error sending message to sidepanel:', error);
        });
    } else if (message.type === 'request_page_context') {
        // Get page context from active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'get_page_context' }, (response) => {
                    if (response) {
                        chrome.runtime.sendMessage({
                            type: 'page_context_data',
                            data: response.data,
                            url: response.url,
                            timestamp: response.timestamp,
                            tabId: tabs[0].id
                        }).catch(() => {});
                    }
                });
            }
        });
    } else if (message.type === 'reload_codebeamer_page') {
        console.log('Codebeamer Assistant: Reload request received from sidepanel');
        // Reload the active tab (Codebeamer page)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'reload_page' }).catch((error) => {
                    console.error('Error sending reload message to content script:', error);
                });
            }
        });
    } else if (message.type === 'reload_service_worker') {
        console.log('Codebeamer Assistant: Reload request for service worker received from sidepanel');
        chrome.runtime.reload().finally(() => {
            console.log('Codebeamer Assistant: Service worker reloaded');
        });
    }
});

console.log('Background script loaded');
