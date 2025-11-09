console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Function to get the entire DOM as a string
function getDOMContent() {
  return document.documentElement.outerHTML;
}

// Function to send DOM data to sidepanel
function sendDOMToSidepanel() {
  console.log('Sending DOM to sidepanel...');
  const domContent = getDOMContent();
  const domSize = domContent.length;

  console.log(`DOM size: ${domSize} characters`);

  chrome.runtime
    .sendMessage({
      type: 'dom_updated',
      data: {
        dom: domContent,
        size: domSize,
      },
      url: window.location.href,
      timestamp: Date.now(),
    })
    .catch((error) => {
      console.error('Error sending DOM to sidepanel:', error);
    });
}

// Initial scan - wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    sendDOMToSidepanel();
  });
} else {
  sendDOMToSidepanel();
}

// Also scan when page is fully loaded
if (document.readyState !== 'complete') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      sendDOMToSidepanel();
    }, 500);
  });
}

// Set up MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  // Debounce the update to avoid too many rapid calls
  clearTimeout(window.domUpdateTimeout);
  window.domUpdateTimeout = setTimeout(sendDOMToSidepanel, 100);
});

// Start observing
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'get_dom') {
    const domContent = getDOMContent();
    sendResponse({
      data: {
        dom: domContent,
        size: domContent.length,
      },
      url: window.location.href,
      timestamp: Date.now(),
    });
  }
  return true;
});

console.log('DOM monitor initialized');
