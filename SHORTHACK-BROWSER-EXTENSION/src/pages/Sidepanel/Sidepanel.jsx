import React, { useEffect, useState } from 'react';
import AgentChat from './AgentChat';
import ResultsTab from './ResultsTab';
import {
  validateSpecification,
  getLastValidationResult,
} from '../../services/backendApi';
import {
  initAuth,
  isAuthenticated,
  login,
  logout,
  getCurrentUser,
} from '../../services/authService';
import './Sidepanel.css';

const Sidepanel = () => {
  const [pageContext, setPageContext] = useState({
    projectId: null,
    trackerId: null,
    specificationItemId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pageContext');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [result, setResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isLoadingLast, setIsLoadingLast] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [chatKey, setChatKey] = useState(0);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initialize authentication
    const initAuthentication = async () => {
      try {
        await initAuth();
        if (isAuthenticated()) {
          const user = getCurrentUser();
          setCurrentUser(user);
          console.log('User authenticated:', user?.displayName);
        } else {
          console.log('User not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initAuthentication();

    // Notify background script when sidepanel is loaded
    console.log('Sidepanel loaded');

    // Request current page context when sidepanel opens
    chrome.runtime.sendMessage({ type: 'request_page_context' }).catch(() => {
      console.log('Could not request page context');
    });

    // Listen for page context updates and tab changes
    const messageListener = (message, sender, sendResponse) => {
      console.log(
        'Short Hack: Received message from background script:',
        message
      );
      if (message.type === 'page_context_data') {
        setPageContext(
          message.data || {
            projectId: null,
            trackerId: null,
            specificationItemId: null,
          }
        );
        setIsLoading(false);
      } else if (
        message.type === 'tab_changed' ||
        message.type === 'tab_updated'
      ) {
        // Tab was changed or updated, request fresh data
        console.log('Tab changed/updated, refreshing page context...');
        setIsLoading(true);
        // Small delay to ensure content script is ready
        setTimeout(() => {
          chrome.runtime
            .sendMessage({ type: 'request_page_context' })
            .catch(() => {
              console.log('Could not request page context after tab change');
              setIsLoading(false);
            });
        }, 100);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Listen for visibility changes to detect when user manually closes the panel
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Panel might be closing, notify background script
        chrome.runtime.sendMessage({ type: 'sidepanel_closed' }).catch(() => {
          // Ignore errors if background script is not ready
        });
      } else {
        // Panel became visible again, request fresh data
        chrome.runtime
          .sendMessage({ type: 'request_page_context' })
          .catch(() => {
            console.log('Could not request page context');
          });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const reloadPanel = () => {
    console.log('Short Hack: Reloading sidepanel');
    window.location.reload();
  };

  const reloadExtension = () => {
    chrome.runtime
      .sendMessage({ type: 'reload_service_worker' })
      .catch((error) => {
        console.error('Error requesting service worker reload:', error);
      })
      .finally(() => {
        console.log('Short Hack: Requested reloading service worker');
      });
    reloadPanel();
  };

  const reloadPage = () => {
    console.log('Short Hack: Triggering main page reload from sidebar');
    chrome.runtime.sendMessage({ type: 'reload_page' }).catch((error) => {
      console.error('Error requesting main page reload:', error);
    });
  };

  const reloadChat = () => {
    console.log('Short Hack: Reloading chat window');
    setChatKey((prevKey) => prevKey + 1);
  };

  const handleLogin = async () => {
    setIsAuthLoading(true);
    setValidationError(null);
    try {
      const result = await login();
      setCurrentUser(result.userInfo);
      console.log('Login successful:', result.userInfo);
    } catch (error) {
      console.error('Login failed:', error);
      setValidationError(`Login failed: ${error.message}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleResultUpdate = (newResult) => {
    setResult(newResult);
    setActiveTab('validation');
  };

  const handleValidate = async () => {
    if (!pageContext.specificationItemId) {
      setValidationError('No specification item ID found on this page');
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      console.log(
        'Starting validation for specification item:',
        pageContext.specificationItemId
      );
      const validationResult = await validateSpecification(
        pageContext.specificationItemId
      );
      console.log('Validation completed:', validationResult);

      // add a test result row to validation result for testing
      let testValue = `TEST-${Math.floor(Math.random() * 1000)}`;
      const testResult = {
        complianceStatus: testValue,
        specificationItem: { id: pageContext.specificationItemId },
        proposal: testValue,
      };
      validationResult.result.validation_results.push(testResult);

      // Pass the result to the handler which will switch to results tab
      handleResultUpdate(validationResult.result);
    } catch (error) {
      console.error('Validation failed:', error);
      setValidationError(
        error.message || 'Validation failed. Please try again.'
      );
    } finally {
      setIsValidating(false);
    }
  };

  const handleLoadLastResult = async () => {
    if (!pageContext.specificationItemId) {
      setValidationError('No specification item ID found on this page');
      return;
    }

    setIsLoadingLast(true);
    setValidationError(null);

    try {
      console.log(
        'Loading last validation result for specification item:',
        pageContext.specificationItemId
      );
      const cachedResult = await getLastValidationResult(
        pageContext.specificationItemId
      );
      console.log('Last validation result loaded:', cachedResult);

      // Check if we actually got results
      if (cachedResult?.result && cachedResult.result.total_validations > 0) {
        console.log('Found cached results, displaying them');
        // Pass the result to the handler which will switch to results tab
        handleResultUpdate(cachedResult.result);
      } else {
        console.log('No cached results found');
        setValidationError(
          'No previous validation results found for this specification'
        );
      }
    } catch (error) {
      console.error('Failed to load last result:', error);
      setValidationError(
        error.message || 'Failed to load cached results. Please try again.'
      );
    } finally {
      setIsLoadingLast(false);
    }
  };

  // Count non-null context values
  const contextCount = Object.values(pageContext).filter(
    (value) => value !== null
  ).length;

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Show only auth section if not authenticated
  if (!currentUser) {
    return (
      <div className="sidepanel-container">
        <div className="top-section">
          <div className="auth-section">
            {isAuthLoading ? (
              <div className="auth-loading">Checking authentication...</div>
            ) : (
              <div className="auth-login">
                <div className="login-message">
                  <p>
                    Please login with your Microsoft account to use the Short
                    Hack.
                  </p>
                </div>
                <button className="login-btn" onClick={handleLogin}>
                  🔐 Login with Microsoft
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidepanel-container">
      <div className="auth-section">
        <div className="auth-user-info">
          <span className="user-name" title={currentUser.email}>
            👤 {currentUser.displayName || 'unknown user'}
          </span>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            Logout
          </button>
        </div>
      </div>
      <div className="top-section">
        <div className="tab-container">
          <div className="tab-header">
            <button
              className={`tab-button ${
                activeTab === 'pageContext' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('pageContext')}
            >
              Page Context ({contextCount} item{contextCount !== 1 ? 's' : ''})
            </button>
            <button
              className={`tab-button ${
                activeTab === 'validation' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('validation')}
            >
              Validation
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'pageContext' && (
              <div className="table-container">
                {isLoading ? (
                  <div className="loading">Reading the page...</div>
                ) : (
                  <>
                    <table className="itemid-table">
                      <thead>
                        <tr>
                          <th>Context</th>
                          <th>ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="context-label">Project ID</td>
                          <td className="context-value">
                            {pageContext.projectId ? (
                              <code>{pageContext.projectId}</code>
                            ) : (
                              <em>Not found</em>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="context-label">Tracker ID</td>
                          <td className="context-value">
                            {pageContext.trackerId ? (
                              <code>{pageContext.trackerId}</code>
                            ) : (
                              <em>Not found</em>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="context-label">
                            Specification Item ID
                          </td>
                          <td className="context-value">
                            {pageContext.specificationItemId ? (
                              <code>{pageContext.specificationItemId}</code>
                            ) : (
                              <em>Not found</em>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}

            {activeTab === 'validation' && (
              <div className="validation-tab-container">
                <div className="validation-section">
                  <button
                    className="load-last-btn"
                    onClick={handleLoadLastResult}
                    disabled={
                      !pageContext.specificationItemId ||
                      isLoadingLast ||
                      isValidating
                    }
                    title={
                      !pageContext.specificationItemId
                        ? 'No specification item ID available'
                        : 'Load last validation result from cache'
                    }
                  >
                    {isLoadingLast && <span className="loader-spinner"></span>}
                    {isLoadingLast ? 'Loading...' : 'Load Latest'}
                  </button>
                  <button
                    className="validate-btn"
                    onClick={handleValidate}
                    disabled={
                      !pageContext.specificationItemId ||
                      isValidating ||
                      isLoadingLast
                    }
                    title={
                      !pageContext.specificationItemId
                        ? 'No specification item ID available'
                        : 'Run new validation against regulations'
                    }
                  >
                    {isValidating && <span className="loader-spinner"></span>}
                    {isValidating ? 'Validating...' : 'Validate'}
                  </button>
                </div>
                <ResultsTab
                  result={result}
                  specificationItemId={pageContext.specificationItemId}
                  onResultLoaded={handleResultUpdate}
                  validationError={validationError}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`chat-section ${isChatVisible ? 'visible' : 'hidden'}`}>
        <div
          className="chat-header"
          onClick={toggleChatVisibility}
          title={isChatVisible ? 'Click to hide chat' : 'Click to show chat'}
        >
          <span className="chat-title">Short Hack AI Assistant</span>
          <span className="chat-toggle-icon">{isChatVisible ? '▼' : '▲'}</span>
        </div>
        <div className={`chat-content ${isChatVisible ? 'visible' : 'hidden'}`}>
          <AgentChat
            key={chatKey}
            pageContext={pageContext}
            result={result}
            onResultUpdate={handleResultUpdate}
          />
        </div>
      </div>

      <div className="reload-buttons-section">
        <button
          className="reload-cb-btn"
          onClick={reloadPage}
          title="Reload Main"
        >
          ↻ Main
        </button>
        <button
          className="reload-panel-btn"
          onClick={reloadPanel}
          title="Reload Sidepanel"
        >
          ↻ Sidepanel
        </button>
        <button
          className="reload-chat-btn"
          onClick={reloadChat}
          title="Reload Chat"
        >
          ↻ Chat
        </button>
        <button
          className="reload-extension-btn"
          onClick={reloadExtension}
          title="Reload Extension"
        >
          ↻ Extension
        </button>
      </div>
    </div>
  );
};

export default Sidepanel;
