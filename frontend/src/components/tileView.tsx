import { useState } from 'react';
import type { TileViewProps } from '../types';
import Tile from './tile';

const TileView: React.FC<TileViewProps> = ({
  employees,
  onEmployeeClick,
  onDelte,
}) => {
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <Tile
          key={emp.id}
          employee={emp}
          onEmployeeClick={onEmployeeClick}
          onActionClick={setOpenActionMenu}
          onDelte={onDelte}
          openActionMenu={openActionMenu}
        />
      ))}
    </div>
  );
};

export default TileView;
