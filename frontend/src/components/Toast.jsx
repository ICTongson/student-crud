import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div 
            key={toast.id} 
            className={`toast-item toast-${toast.type || 'info'}`}
            role="alert"
          >
            <div className="toast-icon">
              {isSuccess && <CheckCircle2 size={19} />}
              {isError && <AlertCircle size={19} />}
              {!isSuccess && !isError && <Info size={19} />}
            </div>

            <div className="toast-content">
              {toast.title && <strong className="toast-title">{toast.title}</strong>}
              <p className="toast-message">{toast.message}</p>
            </div>

            <button
              type="button"
              className="toast-close"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
