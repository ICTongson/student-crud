import React, { useState } from 'react';
import { X, Server, Check, AlertCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { getApiBaseUrl, setApiBaseUrl } from '../api/axiosClient';

export default function ApiSettingsModal({
  isOpen,
  onClose,
  onApiUrlChanged
}) {
  const [urlInput, setUrlInput] = useState(getApiBaseUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    const testUrl = urlInput.replace(/\/+$/, '');
    try {
      // Attempt a ping/GET request to the endpoint
      await axios.get(`${testUrl}/students`, { timeout: 4000 });
      setTestResult({
        success: true,
        message: 'Successfully reached the Student API!'
      });
    } catch (err) {
      if (err.response) {
        // Even if 404 or 401, the server responded!
        setTestResult({
          success: true,
          message: `Server responded with status ${err.response.status}. The host is reachable!`
        });
      } else {
        setTestResult({
          success: false,
          message: `Could not reach ${testUrl}. Ensure backend is running and CORS is enabled.`
        });
      }
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setApiBaseUrl(urlInput.trim());
    if (onApiUrlChanged) {
      onApiUrlChanged(urlInput.trim());
    }
    onClose();
  };

  const handleResetDefault = () => {
    const defaultUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    setUrlInput(defaultUrl);
    setTestResult(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content modal-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Server size={20} />
            </div>
            <div>
              <h2 className="modal-title">API Connection Settings</h2>
              <p className="modal-subtitle">Configure the Student Backend API Base URL</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="apiUrl" className="form-label">
                Backend API Base URL
              </label>
              <input
                id="apiUrl"
                type="text"
                className="form-input"
                placeholder="http://localhost:5000/api"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setTestResult(null);
                }}
              />
              <span className="form-help-text">
                Point this to your running backend server (e.g. port 3000, 5000, 8000, or 8080).
              </span>
            </div>

            <div className="test-connection-row">
              <button
                type="button"
                className="btn btn-secondary icon-btn"
                onClick={handleTestConnection}
                disabled={testing || !urlInput.trim()}
              >
                <RefreshCw size={15} className={testing ? 'spin' : ''} />
                <span>{testing ? 'Testing...' : 'Test Connection'}</span>
              </button>

              <button
                type="button"
                className="btn btn-link"
                onClick={handleResetDefault}
              >
                Reset to Default
              </button>
            </div>

            {testResult && (
              <div className={`connection-alert ${testResult.success ? 'alert-success' : 'alert-error'}`}>
                {testResult.success ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save & Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
