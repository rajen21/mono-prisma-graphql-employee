import type { Employee, GridViewProps } from "../types";

const GridView: React.FC<GridViewProps> = ({ employees, onEmployeeClick }) => {
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">City</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Salary</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Join Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {employees.map(emp => (
              <tr
                key={emp.id}
                onClick={() => onEmployeeClick(emp)}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-sm text-slate-900">EMP-{String(emp.id).padStart(4, '0')}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{emp.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{emp.email}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{emp.department}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{emp.phone}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{emp.address.city}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{emp.company.name}</td>
                <td className="px-4 py-3 text-sm text-slate-900">${emp.salary.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{emp.joinDate}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GridView
