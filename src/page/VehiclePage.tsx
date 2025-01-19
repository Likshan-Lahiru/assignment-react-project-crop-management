import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VehicleModel from "../models/vehicleModel";

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [currentVehicle, setCurrentVehicle] = useState<VehicleModel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newVehicle: VehicleModel = {
      id: currentVehicle?.id || Math.random().toString(36).substr(2, 9),
      licenseNumber: formData.get('licenseNumber') as string,
      category: formData.get('category') as string,
      fuelType: formData.get('fuelType') as string,
      status: formData.get('status') as 'AVAILABLE' | 'UNAVAILABLE',
      staffId: formData.get('staffId') as string,
      remark: formData.get('remark') as string,
    };

    if (currentVehicle) {
      setVehicles(vehicles.map(v => v.id === currentVehicle.id ? newVehicle : v));
      toast.success('Vehicle updated successfully!');
    } else {
      setVehicles([...vehicles, newVehicle]);
      toast.success('Vehicle added successfully!');
    }

    form.reset();
    setCurrentVehicle(null);
  };

  return (
      <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Vehicle Management</h1>
            <p className="text-blue-600">Add, update, or delete vehicle information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {currentVehicle ? 'Update Vehicle' : 'Add New Vehicle'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  License Number
                </label>
                <input
                    type="text"
                    name="licenseNumber"
                    defaultValue={currentVehicle?.licenseNumber}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Category
                </label>
                <input
                    type="text"
                    name="category"
                    defaultValue={currentVehicle?.category}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Fuel Type
                </label>
                <select
                    name="fuelType"
                    defaultValue={currentVehicle?.fuelType}
                    className="form-input"
                    required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Status
                </label>
                <select
                    name="status"
                    defaultValue={currentVehicle?.status}
                    className="form-input"
                    required
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="UNAVAILABLE">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Staff ID
                </label>
                <input
                    type="text"
                    name="staffId"
                    defaultValue={currentVehicle?.staffId}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Remark
                </label>
                <textarea
                    name="remark"
                    defaultValue={currentVehicle?.remark}
                    className="form-input"
                    rows={3}
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  {currentVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setCurrentVehicle(null)}
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Vehicle List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    License
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                <AnimatePresence>
                  {vehicles.map((vehicle) => (
                      <motion.tr
                          key={vehicle.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                          {vehicle.licenseNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                          {vehicle.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            vehicle.status === 'AVAILABLE'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                              onClick={() => setCurrentVehicle(vehicle)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                              onClick={() => {
                                setVehicles(vehicles.filter(v => v.id !== vehicle.id));
                                toast.info('Vehicle deleted successfully!');
                              }}
                              className="text-red-600 hover:text-red-900"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                  ))}
                </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </motion.div>
  );
};

export default VehiclePage;

