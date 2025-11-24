import { ArrowLeft, Edit, Flag, Trash2 } from 'lucide-react';
import type { DetailViewProps, Employee } from '../types';

const DetailView: React.FC<DetailViewProps> = ({
  employee,
  viewMode,
  onBack,
  onAction,
}) => {
  const getStatusColor = (status: Employee['status']): string => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Remote':
        return 'bg-blue-500';
      case 'On Leave':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">
            Back to {viewMode === 'grid' ? 'Grid' : 'Tiles'}
          </span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{employee.name}</h1>
                <p className="text-blue-100 text-lg">{employee.email}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  employee.status
                )}`}
              >
                {employee.status}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Department
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {employee.department}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Employee ID
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    EMP-{String(employee.id).padStart(4, '0')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Join Date
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {employee.joinDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Salary
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    ${employee.salary.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {employee.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Website
                  </label>
                  <p className="text-lg text-blue-600 mt-1">
                    {employee.website}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Company
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {employee.company.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Username
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {employee.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Address
              </label>
              <p className="text-lg text-slate-900 mt-2">
                {employee.address.street}, {employee.address.suite}
                <br />
                {employee.address.city}, {employee.address.zipcode}
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Edit size={18} />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  onAction('Flag', employee?.id);
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Flag size={18} />
                {employee?.flagged ? 'Unflag' : 'Flag'}
              </button>
              <button
                onClick={() => {
                  onAction('Delete', employee?.id);
                  onBack();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
