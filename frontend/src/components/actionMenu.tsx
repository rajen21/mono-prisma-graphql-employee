import { Edit, Flag, Trash2 } from 'lucide-react';
import type { ActionMenuProps } from '../types';
import { useEffect, useRef } from 'react';

const ActionMenu: React.FC<ActionMenuProps> = ({
  employee,
  isOpen,
  onClose,
  onAction,
  onDelte,
}) => {

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAction('Edit', employee);
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <Edit size={16} />
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelte('Flag', employee?.id);
          onClose()
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <Flag size={16} />
        {employee?.flagged ? 'Unflag': 'Flag'}
      </button>
      <button
        onClick={() => {
          onDelte('Delete', employee.id);
          onClose()
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
};

export default ActionMenu;
