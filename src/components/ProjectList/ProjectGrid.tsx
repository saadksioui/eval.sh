import React, { useState, useMemo } from 'react';
import type { Project } from '../../types';
import ProjectCard from './ProjectCard';
import { Search } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<number | 'all'>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = filterTier === 'all' || project.tier === filterTier;
      return matchesSearch && matchesTier;
    });
  }, [projects, searchQuery, filterTier]);

  const tiers = ['all', 0, 1, 2, 3, 4, 5, 6] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-emerald-400 text-emerald-400 font-mono rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        {/* Tier Filters */}
        <div className="flex flex-wrap gap-2">
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1 rounded font-mono text-sm transition-colors ${
                filterTier === tier
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-slate-700 text-emerald-400 hover:bg-slate-600'
              }`}
            >
              {tier === 'all' ? 'All Tiers' : `Tier ${tier}`}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onStart={onProjectSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 font-mono text-lg">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;