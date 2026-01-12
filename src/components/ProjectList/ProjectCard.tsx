import React from 'react';
import type { Project } from '../../types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onStart: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStart }) => {
  // Calculate section counts
  const criticalCount = project.sections.filter(s => s.type === 'critical').length;
  const mandatoryCount = project.sections.filter(s => s.type === 'mandatory').length;
  const bonusCount = project.sections.filter(s => s.type === 'bonus').length;

  return (
    <div className="bg-slate-900/80 backdrop-blur border-2 border-emerald-400/30 hover:border-emerald-400 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cyan-400">{project.name}</h3>
        <Badge variant="tier">Tier {project.tier}</Badge>
      </div>

      {/* Max Score */}
      <p className="text-emerald-400 font-mono text-sm mb-4">
        Max: {project.maxScore} pts
      </p>

      {/* Section Summary */}
      <div className="text-slate-400 text-sm mb-6 space-y-1">
        <p>Sections:</p>
        <div className="flex gap-4">
          {criticalCount > 0 && <span>Critical: {criticalCount}</span>}
          {mandatoryCount > 0 && <span>Mandatory: {mandatoryCount}</span>}
          {bonusCount > 0 && <span>Bonus: {bonusCount}</span>}
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={() => onStart(project.id)}
        className="w-full flex items-center justify-center gap-2"
      >
        Start Evaluation
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProjectCard;