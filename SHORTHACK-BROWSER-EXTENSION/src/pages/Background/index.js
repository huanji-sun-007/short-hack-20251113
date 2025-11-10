// Handle extension icon click to toggle side panel
chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  await chrome.sidePanel.open({ tabId: tabId });
  console.log('Side panel opened for tab:', tabId);
});

// Track tab changes and notify sidepanel
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Notify sidepanel that active tab has changed
  chrome.runtime
    .sendMessage({
      type: 'tab_changed',
      tabId: activeInfo.tabId,
      timestamp: Date.now(),
    })
    .catch(() => {
      // Sidepanel might not be open
    });
});

// Track tab updates (like navigation within the same tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only notify on navigation complete
  if (changeInfo.status === 'complete') {
    chrome.runtime
      .sendMessage({
        type: 'tab_updated',
        tabId: tabId,
        url: tab.url,
        timestamp: Date.now(),
      })
      .catch(() => {
        // Sidepanel might not be open
      });
  }
});

// Handle messages between content script and sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'dom_updated') {
    console.log('Received DOM from content script for tab:', sender.tab?.id);
    // Forward the DOM data to the sidepanel
    chrome.runtime
      .sendMessage({
        type: 'dom_data',
        data: message.data,
        url: message.url,
        timestamp: message.timestamp,
        tabId: sender.tab?.id,
      })
      .catch((error) => {
        console.error('Error sending DOM to sidepanel:', error);
      });
  } else if (message.type === 'request_dom') {
    // Get DOM from active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'get_dom' }, (response) => {
          if (response) {
            chrome.runtime
              .sendMessage({
                type: 'dom_data',
                data: response.data,
                url: response.url,
                timestamp: response.timestamp,
                tabId: tabs[0].id,
              })
              .catch(() => {});
          }
        });
      }
    });
  }
  return true;
});

console.log('Background script loaded');
