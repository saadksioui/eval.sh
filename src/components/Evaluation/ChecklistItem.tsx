import React from 'react';
import type { ChecklistItem as ChecklistItemType } from '../../types';
import { Check, Star } from 'lucide-react';

interface ChecklistItemProps {
  item: ChecklistItemType;
  isChecked: boolean;
  rating?: number;
  isDisabled: boolean;
  onToggle: (itemId: string) => void;
  onRate?: (itemId: string, value: number) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  isChecked,
  rating = 0,
  isDisabled,
  onToggle,
  onRate,
}) => {
  const isRated = item.scale !== undefined;
  const hasValue = isRated ? rating > 0 : isChecked;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
        hasValue ? 'border-l-4 border-emerald-400 bg-slate-800' : 'bg-slate-800/50 hover:bg-slate-800'
      } ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {isRated ? (
        // Star Rating Mode
        <>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                onClick={() => onRate?.(item.id, i + 1)}
                disabled={isDisabled}
                className="focus:outline-none"
              >
                <Star
                  className={`w-5 h-5 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                  } hover:text-yellow-300 transition-colors`}
                />
              </button>
            ))}
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-200">{item.label}</div>
            {item.description && (
              <div className="text-sm text-slate-400 mt-1">{item.description}</div>
            )}
            <div className="text-xs text-slate-500 font-mono mt-1">
              {rating}/5
            </div>
          </div>
        </>
      ) : (
        // Checkbox Mode
        <>
          <button
            onClick={() => onToggle(item.id)}
            disabled={isDisabled}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              isChecked
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-600 hover:border-emerald-400'
            }`}
          >
            {isChecked && <Check className="w-4 h-4" />}
          </button>
          <div className="flex-1">
            <div className="font-medium text-slate-200">{item.label}</div>
            {item.description && (
              <div className="text-sm text-slate-400 mt-1">{item.description}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChecklistItem;