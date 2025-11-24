import { Menu } from 'lucide-react';
import type { TopNavigationProps } from '../types';

const TopNavigation: React.FC<TopNavigationProps> = ({ onMenuClick }) => {
  return (
    <div className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              Employee Portal
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Projects
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
