import React, { useEffect, useState } from 'react';
import './Sidepanel.css';

const Sidepanel = () => {
  const [domSize, setDomSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    console.log('Sidepanel loaded');

    // Request current DOM when sidepanel opens
    chrome.runtime.sendMessage({ type: 'request_dom' }).catch(() => {
      console.log('Could not request DOM');
    });

    // Listen for DOM updates and tab changes
    const messageListener = (message, sender, sendResponse) => {
      console.log('Received message:', message.type);

      if (message.type === 'dom_data') {
        setDomSize(message.data.size || 0);
        setUrl(message.url || '');
        setLastUpdate(new Date(message.timestamp));
        setIsLoading(false);
      } else if (
        message.type === 'tab_changed' ||
        message.type === 'tab_updated'
      ) {
        // Tab was changed or updated, request fresh data
        console.log('Tab changed/updated, refreshing DOM data...');
        setIsLoading(true);
        // Small delay to ensure content script is ready
        setTimeout(() => {
          chrome.runtime.sendMessage({ type: 'request_dom' }).catch(() => {
            console.log('Could not request DOM after tab change');
            setIsLoading(false);
          });
        }, 100);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="sidepanel-container">
      <div className="header">
        <h1>DOM Monitor</h1>
      </div>

      <div className="content">
        {isLoading ? (
          <div className="loading">Loading DOM data...</div>
        ) : (
          <div className="dom-info">
            <div className="info-card">
              <div className="info-label">DOM Size</div>
              <div className="info-value">
                {formatNumber(domSize)} characters
              </div>
            </div>

            {url && (
              <div className="info-card">
                <div className="info-label">Current URL</div>
                <div className="info-url">{url}</div>
              </div>
            )}

            {lastUpdate && (
              <div className="info-card">
                <div className="info-label">Last Updated</div>
                <div className="info-time">
                  {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidepanel;
