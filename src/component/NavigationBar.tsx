import React from 'react';
import {
  LayoutDashboard,
  Settings as SettingsIcon,
  LogOut,
   Car, House, Trees, PersonStanding, Wrench, ScrollText, LeafyGreen,
} from 'lucide-react';



interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const NavigationBar: React.FC<SidebarProps> = ({
  isOpen, 
  currentView, 
  onViewChange, 
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'crops', icon: Trees, label: 'Crop' },
    { id: 'staff', icon: PersonStanding, label: 'Staff' },
    { id: 'fields', icon: House, label: 'Fields' },
    { id: 'vehicle', icon: Car, label: 'Vehicle' },
    { id: 'equipment', icon: Wrench, label: 'Equipment' },
    { id: 'logs', icon: ScrollText, label: 'Logs' },
  ];



  const bottomItems = [
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'logout', icon: LogOut, label: 'Logout', onClick: onLogout },
  ];

  return (
    <nav className={`
      bg-white shadow-lg h-screen flex flex-col
      ${isOpen ? 'w-64' : 'w-20'}
      transition-all duration-300 ease-in-out
    `}>
      <div className="p-4 flex items-center gap-3 border-b">
        <LeafyGreen className="w-8 h-8 text-blue-600" />
        {isOpen && <span className="text-xl font-semibold text-blue-600">Crop Management</span>}
      </div>

      <div className="flex-1 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`
                  w-full px-4 py-2 flex items-center gap-3
                  ${currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-100'}
                  transition-colors duration-200
                `}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t py-4">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={item.onClick || (() => onViewChange(item.id))}
                className={`
                  w-full px-4 py-2 flex items-center gap-3
                  ${currentView === item.id ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}
                  transition-colors duration-200
                `}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;