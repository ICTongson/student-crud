import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading student records...' }) {
  return (
    <div className="loading-state-container">
      <Loader2 size={36} className="spin text-primary" />
      <p className="loading-state-text">{message}</p>
    </div>
  );
}
