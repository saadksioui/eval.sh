import React from 'react';
import { XCircle } from 'lucide-react';

interface CriticalWarningProps {
  isVisible: boolean;
  message?: string;
}

const CriticalWarning: React.FC<CriticalWarningProps> = ({
  isVisible,
  message = "One or more critical checks failed. Evaluation score: 0"
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-red-950 border-4 border-red-500 rounded-lg p-8 relative max-w-md w-full transition-all duration-300">
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 w-full h-px bg-red-400/30 animate-pulse"></div>
        </div>

        {/* Border Pulse Animation */}
        <div className="absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse opacity-50"></div>

        <div className="relative z-10 text-center">
          {/* Icon */}
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4 drop-shadow-lg" />

          {/* Heading */}
          <h2 className="text-3xl font-bold text-red-500 mb-4 font-mono">
            CRITICAL FAILURE
          </h2>

          {/* Message */}
          <p className="text-red-300 font-mono text-lg">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CriticalWarning;