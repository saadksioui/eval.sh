import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProjectGrid from './components/ProjectList/ProjectGrid';
import ScoreDisplay from './components/Evaluation/ScoreDisplay';
import CriticalWarning from './components/Evaluation/CriticalWarning';
import SectionGroup from './components/Evaluation/SectionGroup';
import Button from './components/UI/Button';
import type { Project, ViewMode } from './types';
import { useEvaluationState } from './hooks/useEvaluationState';
import PROJECTS_DATA from './data/projects';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const evaluationState = useEvaluationState(selectedProject || {
    id: '',
    name: '',
    tier: 0,
    maxScore: 0,
    sections: []
  });

  const handleProjectSelect = (projectId: string) => {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setCurrentView('evaluation');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    // Keep selectedProject for state persistence
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      {/* CRT Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-repeat opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.1) 2px,
            rgba(0, 255, 0, 0.1) 4px
          )`,
          animation: 'scanlines 0.1s linear infinite'
        }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {currentView === 'home' ? (
            <div className="transition-opacity duration-300">
              <ProjectGrid
                projects={PROJECTS_DATA}
                onProjectSelect={handleProjectSelect}
              />
            </div>
          ) : (
            selectedProject && evaluationState && (
              <div className="transition-opacity duration-300">
                {/* Back Button */}
                <div className="mb-6">
                  <Button onClick={handleBackToHome} variant="ghost">
                    ← Back to Projects
                  </Button>
                </div>

                {/* Score Display */}
                <ScoreDisplay
                  score={evaluationState.score}
                  maxScore={selectedProject.maxScore}
                  isCriticalFailed={evaluationState.isCriticalFailed}
                  mandatoryScore={evaluationState.mandatoryScore}
                  bonusScore={evaluationState.bonusScore}
                  canAccessBonus={evaluationState.canAccessBonus}
                />

                {/* Critical Warning */}
                <CriticalWarning
                  isVisible={evaluationState.isCriticalFailed}
                  message="Critical requirements not met. Evaluation terminated."
                />

                {/* Sections */}
                <div className="space-y-4">
                  {selectedProject.sections.map(section => (
                    <SectionGroup
                      key={section.title}
                      section={section}
                      checkedItems={evaluationState.checkedItems}
                      ratings={evaluationState.ratings}
                      isDisabled={evaluationState.isCriticalFailed}
                      onToggle={evaluationState.toggleItem}
                      onRate={evaluationState.rateItem}
                    />
                  ))}
                </div>

                {/* Reset Button */}
                <div className="mt-8 text-center">
                  <Button onClick={evaluationState.reset} variant="danger">
                    Reset Evaluation
                  </Button>
                </div>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>

      {/* CSS for scanlines animation */}
      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default App;