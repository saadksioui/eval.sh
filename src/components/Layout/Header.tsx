import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b-2 border-emerald-400">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          {/* Logo and Prompt */}
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-emerald-400 drop-shadow-lg" />
            <span className="text-emerald-400 font-mono text-sm drop-shadow-sm">
              user@1337-eval:~$
            </span>
          </div>

          {/* Title */}
          <div className="text-center sm:text-right">
            <h1 className="text-cyan-400 font-bold text-xl drop-shadow-lg">
              ./eval.sh
            </h1>
          </div>
        </div>
      </div>

      {/* Optional Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-emerald-400/30 animate-pulse"></div>
      </div>
    </header>
  );
};

export default Header;