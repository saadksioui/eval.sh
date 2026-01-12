import React, { useState } from 'react';
import type { Section } from '../../types';
import ChecklistItem from './ChecklistItem';
import { ChevronDown, ChevronUp, Shield, Target, Star } from 'lucide-react';
import Badge from '../UI/Badge';

interface SectionGroupProps {
  section: Section;
  checkedItems: Set<string>;
  ratings: Record<string, number | boolean>;
  isDisabled: boolean;
  onToggle: (itemId: string) => void;
  onRate: (itemId: string, value: number) => void;
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  section,
  checkedItems,
  ratings,
  isDisabled,
  onToggle,
  onRate,
}) => {
  const [isExpanded, setIsExpanded] = useState(section.type === 'critical'); // Critical expanded by default

  // Calculate completion
  const completedCount = section.items.filter(item => {
    if (item.scale) {
      return (ratings[item.id] as number) > 0;
    } else {
      return checkedItems.has(item.id);
    }
  }).length;

  const totalCount = section.items.length;

  // Icon based on type
  const getIcon = () => {
    switch (section.type) {
      case 'critical':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'mandatory':
        return <Target className="w-5 h-5 text-emerald-400" />;
      case 'bonus':
        return <Star className="w-5 h-5 text-yellow-400" />;
    }
  };

  // Border color
  const getBorderColor = () => {
    if (section.type === 'critical') return 'border-red-500';
    if (section.type === 'bonus') return isDisabled ? 'border-slate-600' : 'border-yellow-400';
    return 'border-slate-700';
  };

  return (
    <div className={`bg-slate-900/60 border ${getBorderColor()} rounded-lg mb-4 relative`}>
      {/* Disabled Overlay */}
      {isDisabled && (
        <div className="absolute inset-0 bg-black/50 rounded-lg z-10"></div>
      )}

      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-slate-800 flex items-center justify-between relative z-20"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <h3 className="text-lg font-semibold text-slate-200">{section.title}</h3>
          {section.type !== 'critical' && (
            <span className="text-sm text-slate-400 font-mono">
              {section.weight} points
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Badge color="gray">
            {completedCount}/{totalCount} completed
          </Badge>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-2">
          {section.items.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              isChecked={checkedItems.has(item.id)}
              rating={item.scale ? (ratings[item.id] as number) || 0 : undefined}
              isDisabled={isDisabled}
              onToggle={onToggle}
              onRate={onRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionGroup;