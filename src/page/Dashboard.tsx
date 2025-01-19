import React from 'react';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sun, Cloud, CloudRain, Tractor, Wheat, DollarSign, AlertTriangle, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const EnhancedDashboardPage = () => {
  const cropYieldData = {
    labels: ['Wheat', 'Corn', 'Soybeans', 'Barley', 'Oats'],
    datasets: [
      {
        label: 'Yield (tons/acre)',
        data: [3.2, 4.5, 2.8, 3.7, 2.1],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const financialData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Expenses',
        data: [10000, 15000, 13000, 16000, 14000, 18000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  const equipmentStatus = [
    { name: 'Tractor 1', status: 'Operational' },
    { name: 'Harvester 2', status: 'Maintenance' },
    { name: 'Sprayer 3', status: 'Operational' },
    { name: 'Plow 4', status: 'Out of Service' },
  ];

  const weatherForecast = [
    { day: 'Mon', temp: 72, icon: Sun },
    { day: 'Tue', temp: 68, icon: Cloud },
    { day: 'Wed', temp: 65, icon: CloudRain },
    { day: 'Thu', temp: 70, icon: Sun },
    { day: 'Fri', temp: 73, icon: Sun },
  ];

  return (
      <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Farm Dashboard</h1>

          </div>
          <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success("Dashboard data updated!")}
          >
            Refresh Data
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Crops" value="5" icon={Wheat} trend="up" percentage="12%" />
          <DashboardCard title="Active Equipment" value="15" icon={Tractor} trend="down" percentage="3%" />
          <DashboardCard title="Monthly Revenue" value="$45,000" icon={DollarSign} trend="up" percentage="8%" />
          <DashboardCard title="Yield Forecast" value="3.8 tons/acre" icon={ChartIcon} trend="up" percentage="5%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Crop Yield Comparison">
            <Bar data={cropYieldData} options={{ responsive: true, plugins: { legend: { position: 'top' as const } } }} />
          </ChartCard>
          <ChartCard title="Financial Overview">
            <Line data={financialData} options={{ responsive: true, plugins: { legend: { position: 'top' as const } } }} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EquipmentStatusCard equipmentStatus={equipmentStatus} />
          <WeatherForecastCard forecast={weatherForecast} />
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </motion.div>
  );
};

const DashboardCard = ({ title, value, icon: Icon, trend, percentage }) => (
    <motion.div
        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-blue-600">{title}</p>
          <h2 className="text-2xl font-bold text-blue-800 mt-2">{value}</h2>
        </div>
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
      <div className={`flex items-center mt-4 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
        <span className="ml-1 text-sm font-medium">{percentage}</span>
      </div>
    </motion.div>
);

const ChartCard = ({ title, children }) => (
    <motion.div
        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-blue-700">{title}</h2>
      {children}
    </motion.div>
);

const EquipmentStatusCard = ({ equipmentStatus }) => (
    <motion.div
        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Equipment Status</h2>
      <div className="space-y-4">
        {equipmentStatus.map((equipment, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-blue-800">{equipment.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  equipment.status === 'Operational' ? 'bg-green-100 text-green-800' :
                      equipment.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
              }`}>
            {equipment.status === 'Operational' && <CheckCircle2 className="inline-block w-4 h-4 mr-1" />}
                {equipment.status === 'Maintenance' && <AlertTriangle className="inline-block w-4 h-4 mr-1" />}
                {equipment.status === 'Out of Service' && <AlertTriangle className="inline-block w-4 h-4 mr-1" />}
                {equipment.status}
          </span>
            </div>
        ))}
      </div>
    </motion.div>
);

const WeatherForecastCard = ({ forecast }) => (
    <motion.div
        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-blue-700">5-Day Weather Forecast</h2>
      <div className="flex justify-between">
        {forecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-blue-600 font-medium">{day.day}</p>
              <day.icon className="w-8 h-8 mx-auto my-2 text-blue-500" />
              <p className="text-blue-800">{day.temp}°F</p>
            </div>
        ))}
      </div>
    </motion.div>
);

const ChartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export default EnhancedDashboardPage;

