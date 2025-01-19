

import { useState } from 'react';
import DashboardPage from "./page/Dashboard.tsx";
import FieldPage from "./page/FieldPage.tsx";
import CropPage from "./page/CropPage.tsx";
import StaffPage from "./page/StaffPage.tsx";
import LogPage from "./page/LogPage.tsx";
import EquipmentPage from "./page/EquipmentPage.tsx";
import VehiclePage from "./page/VehiclePage.tsx";
import NavigationBar from "./component/NavigationBar.tsx"
import SettingPage from "./page/SettingPage.tsx";
import Dashboard from "./page/Dashboard.tsx";


function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);



    const handleLogout = () => {

        console.log('Logging out...');
    };

    const renderCurrentView = () => {
        switch(currentView) {
            case 'dashboard':
                return <DashboardPage />;
            case 'vehicle':
                return <VehiclePage />;
            case 'equipment':
                return <EquipmentPage />;
            case 'logs':
                return <LogPage />;
            case 'staff':
                return <StaffPage />;
            case 'crops':
                return <CropPage />;
            case 'fields':
                return <FieldPage />;
            case 'settings':
                return <SettingPage />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <NavigationBar
                    isOpen={isSidebarOpen}
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    onLogout={handleLogout}
                />

                <main className="flex-1 min-h-screen">
                    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                        >
                            <span className="sr-only">Open menu</span>
                            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                            <div className="w-6 h-0.5 bg-gray-600"></div>
                        </button>


                    </header>

                    <div className="p-6">
                        {renderCurrentView()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
