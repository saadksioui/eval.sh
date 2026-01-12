import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-emerald-400/30 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-slate-400 text-sm font-mono space-y-2">
          {/* Row 1 */}
          <p className="flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-red-400" /> for the 1337 Network
          </p>

          {/* Row 2 */}
          <p className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://github.com/thereal1saad/eval.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span>|</span>
            <a
              href="https://www.42network.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              42 Network
            </a>
            <span>|</span>
            <a
              href="https://github.com/saadksioui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              @saadksioui
            </a>
          </p>

          {/* Row 3 */}
          <p>
            Not affiliated with 42. For educational purposes only.
          </p>

          {/* Row 4 */}
          <p>
            © 2026 eval.sh v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;