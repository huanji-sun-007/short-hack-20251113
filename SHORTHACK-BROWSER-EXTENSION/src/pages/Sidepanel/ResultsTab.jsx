import React, { useState, useEffect } from 'react';
import { updateItemDescription } from '../../services/backendApi';
import './ResultsTab.css';

const ResultsTab = ({
  result,
  specificationItemId,
  onResultLoaded,
  onLoadLastResult,
  validationError,
}) => {
  const [applyingItems, setApplyingItems] = useState(new Set());
  const [appliedItems, setAppliedItems] = useState(new Set());
  const [applyErrors, setApplyErrors] = useState({});

  // Clear appliedItems when new results come in
  useEffect(() => {
    console.log(
      'ResultsTab: New results received, clearing applied items state'
    );
    setAppliedItems(new Set());
    setApplyErrors({});
  }, [result]);

  const handleApply = async (item, index) => {
    console.log('Apply clicked for item:', index, item);

    const itemId = item.specificationItem?.id;
    const proposal = item.proposal;

    if (!itemId) {
      console.error('No item ID found');
      setApplyErrors((prev) => ({ ...prev, [index]: 'No item ID found' }));
      return;
    }

    if (!proposal) {
      console.error('No proposal found');
      setApplyErrors((prev) => ({ ...prev, [index]: 'No proposal found' }));
      return;
    }

    try {
      // Mark as applying
      setApplyingItems((prev) => new Set([...prev, index]));
      setApplyErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });

      console.log(`Updating description for item ${itemId} with proposal`);

      // Call the backend API to update the description
      const response = await updateItemDescription(itemId, proposal, 'Wiki');

      console.log('Description updated successfully:', response);

      // Mark as applied
      setAppliedItems((prev) => new Set([...prev, index]));

      console.log('Short Hack: Description updated, requesting page reload');
      // Request page reload to show updated content
      chrome.runtime
        .sendMessage({ type: 'reload_page' })
        .catch((error) => {
          console.error('Error requesting page reload:', error);
        })
        .finally(() => {
          console.log('Short Hack: Page reload requested');
        });
    } catch (error) {
      console.error('Error applying proposal:', error);
      setApplyErrors((prev) => ({
        ...prev,
        [index]: error.message || 'Failed to apply proposal',
      }));
    } finally {
      // Remove from applying set
      setApplyingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const handleFeedback = (item, index, isCorrect) => {
    console.log(
      `Feedback: ${isCorrect ? 'Correct' : 'Incorrect'} for item:`,
      index,
      item
    );
    // TODO: Implement feedback logic
  };

  return (
    <div className="results-container">
      {validationError ? (
        <div className="no-validation-results">
          <p>{validationError}</p>
        </div>
      ) : result ? (
        <div className="table-container">
          {result.validation_results &&
          Array.isArray(result.validation_results) ? (
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Compliance Status</th>
                  <th>Specification Item</th>
                  <th>Spec Desc</th>
                  <th>Req ID</th>
                  <th>Requirement</th>
                  <th>Req Desc</th>
                  <th>Reason</th>
                  <th>Evidence</th>
                  <th>Improvement Suggestions</th>
                  <th>Proposal</th>
                  <th>Action</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {result.validation_results.map((item, index) => (
                  <tr key={index}>
                    <td className="row-number">{index + 1}</td>
                    <td>{item.specificationItem?.id || 'N/A'}</td>
                    <td
                      className={`compliance-status ${item.complianceStatus?.toLowerCase()}`}
                    >
                      {item.complianceStatus || 'N/A'}
                    </td>
                    <td>{item.specificationItem?.name || 'N/A'}</td>
                    <td>{item.specificationItem?.description || 'N/A'}</td>
                    <td>{item.requirement?.id || 'N/A'}</td>
                    <td>{item.requirement?.name || 'N/A'}</td>
                    <td>{item.requirement?.description || 'N/A'}</td>
                    <td>{item.reason || 'N/A'}</td>
                    <td>{item.evidence || 'N/A'}</td>
                    <td>{item.improvement_suggestions || 'N/A'}</td>
                    <td className="proposal-cell">{item.proposal || 'N/A'}</td>
                    <td className="action-cell">
                      <div className="action-wrapper">
                        <button
                          className={`action-btn apply-btn ${
                            appliedItems.has(index) ? 'applied' : ''
                          }`}
                          onClick={() => handleApply(item, index)}
                          disabled={
                            applyingItems.has(index) || appliedItems.has(index)
                          }
                        >
                          {applyingItems.has(index)
                            ? 'Applying...'
                            : appliedItems.has(index)
                            ? 'Applied ✓'
                            : 'Apply'}
                        </button>
                        {applyErrors[index] && (
                          <div
                            className="error-message"
                            title={applyErrors[index]}
                          >
                            Error: {applyErrors[index]}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="feedback-cell">
                      <div className="feedback-wrapper">
                        <button
                          className="feedback-btn correct-btn"
                          onClick={() => handleFeedback(item, index, true)}
                        >
                          Correct
                        </button>
                        <button
                          className="feedback-btn incorrect-btn"
                          onClick={() => handleFeedback(item, index, false)}
                        >
                          Incorrect
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="table-container">
              <div className="no-validation-results">
                <p>
                  Invalid result format. Expected validation_results with array
                  of items.
                </p>
                <details>
                  <summary>Raw result data</summary>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </details>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>No results yet. Results from agent responses will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsTab;
