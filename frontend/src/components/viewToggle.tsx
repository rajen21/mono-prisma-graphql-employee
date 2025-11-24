import { Grid3x3, LayoutGrid } from 'lucide-react';
import type { ViewToggleProps } from '../types';

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-slate-800">Employees Directory</h2>
      <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'grid'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Grid3x3 size={20} />
        </button>
        <button
          onClick={() => onViewChange('tile')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'tile'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutGrid size={20} />
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
