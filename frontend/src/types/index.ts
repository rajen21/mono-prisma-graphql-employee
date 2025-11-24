interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  department: string;
  salary: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Remote';
  flagged: boolean
}

export type ViewMode = 'grid' | 'tile';
export type ActionType = 'Edit' | 'Flag' | 'Delete';

export interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TopNavigationProps {
  onMenuClick: () => void;
}

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export interface GridViewProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
}

export interface ActionMenuProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: ActionType, employee: Employee) => void;
  onDelte: (actionType: ActionType, id: number) => void
}

export interface EmployeeTileProps {
  employee: Employee;
  openActionMenu: number | null;
  onEmployeeClick: (employee: Employee) => void;
  onActionClick: (id: number | null) => void;
  onDelte: (actionType: ActionType, id: number) => void
}

export interface TileViewProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onDelte: (actionType: ActionType, id: number) => void
}

export interface DetailViewProps {
  employee: Employee;
  viewMode: ViewMode;
  onBack: () => void;
  onAction: (actionType: ActionType, id:number) => void;
}