import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EquipmentModel from "../models/EquipmentModel";

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<EquipmentModel[]>([]);
  const [currentEquipment, setCurrentEquipment] = useState<EquipmentModel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newEquipment: EquipmentModel = {
      id: currentEquipment?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      type: formData.get('type') as 'ELECTRICAL' | 'MECHANICAL',
      status: formData.get('status') as 'AVAILABLE' | 'UNAVAILABLE',
      staffId: formData.get('staffId') as string,
      fieldId: formData.get('fieldId') as string,
    };

    if (currentEquipment) {
      setEquipment(equipment.map(e => e.id === currentEquipment.id ? newEquipment : e));
      toast.success('Equipment updated successfully!');
    } else {
      setEquipment([...equipment, newEquipment]);
      toast.success('Equipment added successfully!');
    }

    form.reset();
    setCurrentEquipment(null);
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
            <h1 className="text-2xl font-bold text-blue-800">Equipment Management</h1>
            <p className="text-blue-600">Add, update, or delete equipment information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {currentEquipment ? 'Update Equipment' : 'Add New Equipment'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Equipment Name
                </label>
                <input
                    type="text"
                    name="name"
                    defaultValue={currentEquipment?.name}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Type
                </label>
                <select
                    name="type"
                    defaultValue={currentEquipment?.type}
                    className="form-input"
                    required
                >
                  <option value="ELECTRICAL">Electrical</option>
                  <option value="MECHANICAL">Mechanical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Status
                </label>
                <select
                    name="status"
                    defaultValue={currentEquipment?.status}
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
                    defaultValue={currentEquipment?.staffId}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Field ID
                </label>
                <input
                    type="text"
                    name="fieldId"
                    defaultValue={currentEquipment?.fieldId}
                    className="form-input"
                    required
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  {currentEquipment ? 'Update Equipment' : 'Add Equipment'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setCurrentEquipment(null)}
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
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Equipment List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Type
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
                  {equipment.map((item) => (
                      <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === 'AVAILABLE'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                              onClick={() => setCurrentEquipment(item)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                              onClick={() => {
                                setEquipment(equipment.filter(e => e.id !== item.id));
                                toast.info('Equipment deleted successfully!');
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

export default EquipmentPage;

