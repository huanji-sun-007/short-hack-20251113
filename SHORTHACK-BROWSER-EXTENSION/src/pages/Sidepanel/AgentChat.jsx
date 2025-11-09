import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { generateDirectLineToken } from '../../services/directLineService';
import './AgentChat.css';

// Use the built icon path instead of import
const botIcon = './icon-34.png';

const AgentChat = ({ pageContext = { projectId: null, trackerId: null, specificationItemId: null }, result = null, onResultUpdate }) => {
    const [directLineToken, setDirectLineToken] = useState(null);
    const [isLoadingToken, setIsLoadingToken] = useState(true);
    const [tokenError, setTokenError] = useState(null);
    const [initialMessageSent, setInitialMessageSent] = useState(false);
    const processedActivityIds = useRef(new Set());
    const messageHistory = useRef([]);
    const historyIndex = useRef(-1);
    
    // Function to intercept and process messages from the agent
    const processAgentMessage = useCallback((activity) => {
        let text = activity.text;
        if (!text) return text;
        
        // Look for output portions with <output> tags, with optional closing </output>
        const outputRegex = /<output>(.*?)(?:<\/output>|$)/gs;

        // Extract output content and remove it from displayed text
        text = text.replace(outputRegex, (match, outputContent) => {
            const trimmedContent = outputContent.trim();
            
            try {
                let extractedResult = JSON.parse(trimmedContent);
                console.log('Extracted JSON result:', extractedResult);
                if (activity.id && !processedActivityIds.current.has(activity.id)) {
                    onResultUpdate(extractedResult);
                }
                processedActivityIds.current.add(activity.id);
            } catch (error) {
                // If it's not valid JSON, just store the raw content
                console.error("Error: ", error);
                console.log('Extracted output result (non-JSON):', trimmedContent);
            }
            return '';
        });
        
        return text.trim();
    }, [onResultUpdate]);

    // Generate Direct Line token on component mount
    useEffect(() => {
        const getToken = async () => {
            try {
                console.log("Generating Direct Line token for Azure Bot...");
                const token = await generateDirectLineToken();
                setDirectLineToken(token);
                setIsLoadingToken(false);
            } catch (error) {
                console.error('Failed to generate Direct Line token:', error);
                setTokenError(error.message);
                setIsLoadingToken(false);
            }
        };

        getToken();
    }, []);

    // Create Direct Line connection to Azure Bot
    const directLine = useMemo(() => {
        if (!directLineToken) {
            return null;
        }

        console.log("Creating Direct Line connection to Azure Bot");

        const connection = createDirectLine({
            token: directLineToken,
            webSocket: true,
            timeout: 60000,
        });

        return connection;
    }, [directLineToken]);

    // Send "Hi" message when the connection is established
    useEffect(() => {
        if (directLine && !initialMessageSent) {
            const sendInitialMessage = () => {
                let message = 'こんにちは';
                console.log(`Sending initial '${message}' message to agent`);
                directLine.postActivity({
                    type: 'message',
                    text: message,
                    from: { id: 'extension-user' },
                    channelData: {
                        streaming: false,
                        customContext: {
                            pageContext,
                            result
                        }
                    }
                }).subscribe({
                    next: () => {
                        console.log('Initial message sent successfully');
                    },
                    error: (error) => console.error('Failed to send initial message:', error)
                });
                setInitialMessageSent(true);
            };

            // Wait a moment for the connection to be fully established
            const timer = setTimeout(sendInitialMessage, 1000);
            return () => clearTimeout(timer);
        }
    }, [directLine, initialMessageSent, pageContext, result]);

    // Middleware to intercept incoming messages from the agent
    const activityMiddleware = useMemo(() => () => next => ({ activity, ...args }) => {
        // Process incoming messages from the bot (agent)
        if (activity.from.role === 'bot' && activity.text) {
            const processedText = processAgentMessage(activity);
            activity = {
                ...activity,
                text: processedText
            };
        }
        // Track user messages for history
        if (activity.from.role === 'user' && activity.type === 'message' && activity.text) {
            const text = activity.text.trim();
            if (text) {
                // Add to history if it's not a duplicate of the last message
                if (messageHistory.current.length === 0 || messageHistory.current[messageHistory.current.length - 1] !== text) {
                    messageHistory.current.push(text);
                }
                historyIndex.current = messageHistory.current.length; // Reset to end
            }
        }
        return next({ activity, ...args });
    }, [processAgentMessage]);
    
    const customDirectLine = useMemo(
        () => ({
        ...directLine,
        postActivity: (activity) => {
            // Only modify message or event activities from the user
            if (activity.type === 'message' || activity.type === 'event') {
                return directLine.postActivity({
                    ...activity,
                    channelData: {
                        ...activity.channelData,
                        customContext: {
                            pageContext,
                            result
                        }
                    },
                });
            }
            // For other activities (like typing), send as is
            return directLine.postActivity(activity);
        },
        }),
        [directLine, pageContext, result]
    );

    // Add keyboard event handler for arrow keys
    useEffect(() => {
        const handleKeyDown = (event) => {
            const target = event.target;
            // Only handle if focus is in the chat input
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                const isTextInput = target.getAttribute('data-id') === 'webchat-sendbox-input' || 
                                   target.className.includes('webchat') ||
                                   target.closest('[data-id="webchat-sendbox-input"]') ||
                                   target.closest('[role="textbox"]');
                
                if (isTextInput && messageHistory.current.length > 0) {
                    if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        if (historyIndex.current > 0) {
                            historyIndex.current--;
                            const newValue = messageHistory.current[historyIndex.current];
                            
                            // Update the input value and trigger React events
                            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                            nativeInputValueSetter.call(target, newValue);
                            
                            const inputEvent = new Event('input', { bubbles: true });
                            target.dispatchEvent(inputEvent);
                            
                            const changeEvent = new Event('change', { bubbles: true });
                            target.dispatchEvent(changeEvent);
                        }
                    } else if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        let newValue = '';
                        
                        if (historyIndex.current < messageHistory.current.length - 1) {
                            historyIndex.current++;
                            newValue = messageHistory.current[historyIndex.current];
                        } else if (historyIndex.current === messageHistory.current.length - 1) {
                            // Move past the last item to clear the input
                            historyIndex.current = messageHistory.current.length;
                            newValue = '';
                        }
                        
                        // Update the input value and trigger React events
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                        nativeInputValueSetter.call(target, newValue);
                        
                        const inputEvent = new Event('input', { bubbles: true });
                        target.dispatchEvent(inputEvent);
                        
                        const changeEvent = new Event('change', { bubbles: true });
                        target.dispatchEvent(changeEvent);
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Style options for the chat
    const styleOptions = {
        sendTimeout: 60000
    };

    // Show loading state while getting token
    if (isLoadingToken) {
        return (
            <div className="agent-chat-wrapper">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Connecting to Azure Bot Service...</p>
                </div>
            </div>
        );
    }

    // Show error state if token generation failed
    if (tokenError) {
        return (
            <div className="agent-chat-wrapper">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>Connection Failed</h3>
                    <p>Failed to connect to Azure Bot Service:</p>
                    <p className="error-message">{tokenError}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    // Show chat interface when connected
    return (
        <div className="agent-chat-wrapper">
            <ReactWebChat 
                directLine={customDirectLine}
                userID='extension-user'
                styleOptions={styleOptions}
                activityMiddleware={activityMiddleware}
            />
        </div>
    );
};

export default AgentChat;