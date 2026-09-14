/* Add React overlay component for processing state */
import React, { useState, useEffect } from 'react';

export const AgentProcessingOverlay: React.FC<{show:boolean}> = ({show}) => {
  if(!show) return null;
  return (
    <div className="agent-processing-overlay" aria-live="assertive" role="status">
      <div className="agent-processing-card">
        <svg className="agent-robot-icon" viewBox="0 0 64 64" aria-hidden="true"><!-- simple robot head -->
          <circle cx="32" cy="24" r="12" fill="currentColor" />
          <rect x="20" y="36" width="24" height="20" fill="currentColor" rx="4" />
          <circle cx="28" cy="42" r="2" fill="#fff" />
          <circle cx="36" cy="42" r="2" fill="#fff" />
        </svg>
        <div className="agent-processing-text">Processing…</div>
        <div className="agent-processing-sub">Agent is thinking, please wait.</div>
        <div className="agent-dots-spinner">
          <div className="agent-dot"></div>
          <div className="agent-dot"></div>
          <div className="agent-dot"></div>
        </div>
      </div>
    </div>
  );
};
