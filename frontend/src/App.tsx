import { useCallback, useEffect, useState } from 'react';
import './App.css';
import type { ActionType, Employee, ViewMode } from './types';
import DetailView from './components/detailView';
import HamburgerMenu from './components/hamburgerMenu';
import TopNavigation from './components/topNavigation';
import ViewToggle from './components/viewToggle';
import LoadingSpinner from './components/loading';
import GridView from './components/gridTable';
import TileView from './components/tileView';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const onDelete = useCallback(
    (actionType: ActionType, id: number) => {
      if (actionType === "Delete") {
        const filterEmployee = employees.filter((emp) => emp.id !== id);
        setEmployees(filterEmployee);
      } else if (actionType === "Flag") {
        const empInd = employees.findIndex(emp => emp.id === id)
        const data = [...employees]
        data[empInd] = {...data[empInd], flagged: !data[empInd].flagged}
        setEmployees(data)
      }
    },
    [employees]
  );

  async function fetchEmployees(): Promise<void> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();

      const enrichedData: Employee[] = data.map((user: any) => ({
        ...user,
        department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Design'][
          Math.floor(Math.random() * 5)
        ],
        salary: Math.floor(Math.random() * 50000) + 50000,
        joinDate: new Date(
          2020 + Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28)
        )
          .toISOString()
          .split('T')[0],
        status: (['Active', 'On Leave', 'Remote'] as const)[
          Math.floor(Math.random() * 3)
        ],
      }));

      setEmployees(enrichedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchEmployees();
  }, []);

  if (selectedEmployee) {
    return (
      <DetailView
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
        viewMode={viewMode}
        onAction={onDelete}
      />
    );
  }

  return (
    <div className="w-full bg-slate-50">
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <TopNavigation onMenuClick={() => setMenuOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />

        {loading ? (
          <LoadingSpinner />
        ) : viewMode === 'grid' ? (
          <GridView
            employees={employees}
            onEmployeeClick={setSelectedEmployee}
          />
        ) : (
          <TileView
            employees={employees}
            onEmployeeClick={setSelectedEmployee}
            onDelte={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
