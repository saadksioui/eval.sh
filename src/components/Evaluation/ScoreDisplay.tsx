import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  isCriticalFailed: boolean;
  mandatoryScore?: number;
  bonusScore?: number;
  canAccessBonus?: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  maxScore,
  isCriticalFailed,
  mandatoryScore,
  bonusScore,
  canAccessBonus,
}) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  // Determine color based on score
  let scoreColor = 'text-red-500';
  let barColor = 'bg-red-500';
  let glowClass = '';

  if (isCriticalFailed) {
    scoreColor = 'text-red-500';
    barColor = 'bg-red-500';
  } else if (percentage >= 100) {
    scoreColor = 'text-emerald-400';
    barColor = 'bg-emerald-500';
    glowClass = 'drop-shadow-lg';
  } else if (percentage >= 80) {
    scoreColor = 'text-cyan-400';
    barColor = 'bg-cyan-500';
  } else if (percentage >= 50) {
    scoreColor = 'text-yellow-400';
    barColor = 'bg-yellow-500';
  }

  const displayScore = isCriticalFailed ? 0 : score;

  return (
    <div className="sticky top-15 z-50">
      <div className={`bg-slate-900 border-2 border-emerald-400 rounded-lg p-6 ${percentage >= 100 ? 'bg-gradient-to-r from-emerald-900/20 to-cyan-900/20' : ''}`}>
        {/* Critical Failure Alert */}
        {isCriticalFailed && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-mono font-bold">CRITICAL FAILURE - EVALUATION TERMINATED</span>
          </div>
        )}

        {/* Score Display */}
        <div className="flex items-baseline justify-between mb-4">
          <span className={`text-5xl font-bold font-mono ${scoreColor} ${glowClass}`}>
            {displayScore.toFixed(2)}
          </span>
          <span className="text-3xl text-slate-500 font-mono">
            / {maxScore}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>

        {/* Score Breakdown */}
        {(mandatoryScore !== undefined || bonusScore !== undefined) && (
          <div className="text-sm text-slate-400 font-mono space-y-1">
            {mandatoryScore !== undefined && (
              <div className="flex justify-between">
                <span>Mandatory:</span>
                <span className="text-emerald-400">{mandatoryScore}</span>
              </div>
            )}
            {canAccessBonus && bonusScore !== undefined && (
              <div className="flex justify-between">
                <span>Bonus:</span>
                <span className="text-cyan-400">{bonusScore}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;