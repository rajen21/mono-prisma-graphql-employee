import { MoreVertical } from 'lucide-react';
import type { ActionType, Employee, EmployeeTileProps } from '../types';
import ActionMenu from './actionMenu';

const Tile: React.FC<EmployeeTileProps> = ({
  employee,
  onEmployeeClick,
  onActionClick,
  openActionMenu,
  onDelte,
}) => {
  const getStatusColor = (status: Employee['status']): string => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Remote':
        return 'bg-blue-100 text-blue-700';
      case 'On Leave':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAction = (action: ActionType, emp: Employee): void => {
    alert(`${action} action for ${emp.name}`);
    onActionClick(null);
  };

  return (
    <div
      className={`${employee?.flagged ? "bg-[#e5f3ff]" : "bg-white"} rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer`}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        if (!target.closest('.action-menu')) {
          onEmployeeClick(employee);
        }
      }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {employee.name}
            </h3>
            <p className="text-sm text-left text-slate-500">
              {employee.department}
            </p>
          </div>
          <div className="relative action-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onActionClick(employee.id);
              }}
              className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            <ActionMenu
              employee={employee}
              isOpen={openActionMenu === employee.id}
              onClose={() => onActionClick(null)}
              onAction={handleAction}
              onDelte={onDelte}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Email:</span>
            <span className="text-slate-700 truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Phone:</span>
            <span className="text-slate-700">
              {employee.phone.split(' ')[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">City:</span>
            <span className="text-slate-700">{employee.address.city}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              employee.status
            )}`}
          >
            {employee.status}
          </span>
          <span className="text-xs text-slate-500">
            ID: EMP-{String(employee.id).padStart(4, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
