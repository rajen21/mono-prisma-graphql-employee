import { useState } from 'react';
import type { HamburgerMenuProps } from '../types';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string): void => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Menu</h2>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Dashboard
            </a>

            <div>
              <button
                onClick={() => toggleSubmenu('employees')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
              >
                <span>Employees</span>
                {activeSubmenu === 'employees' ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
              {activeSubmenu === 'employees' && (
                <div className="ml-4 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    All Employees
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Add New
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Departments
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleSubmenu('reports')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
              >
                <span>Reports</span>
                {activeSubmenu === 'reports' ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
              {activeSubmenu === 'reports' && (
                <div className="ml-4 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Monthly
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Quarterly
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Settings
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
