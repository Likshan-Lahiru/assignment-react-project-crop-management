import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CropModel from '../models/cropModel';

const CropPage = () => {
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [currentCrop, setCurrentCrop] = useState<CropModel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newCrop: CropModel = {
      id: currentCrop?.id || Math.random().toString(36).substr(2, 9),
      commonName: formData.get('commonName') as string,
      scientificName: formData.get('scientificName') as string,
      category: formData.get('category') as string,
      season: formData.get('season') as string,
      imageUrl: currentCrop?.imageUrl,
      fieldId: formData.get('fieldId') as string,
    };

    if (currentCrop) {
      setCrops(crops.map(crop => crop.id === currentCrop.id ? newCrop : crop));
      toast.success('Crop updated successfully!');
    } else {
      setCrops([...crops, newCrop]);
      toast.success('Crop added successfully!');
    }

    form.reset();
    setCurrentCrop(null);
  };

  return (
      <motion.div
          className="space-y-6 animate-fade-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Crop Management</h1>
            <p className="text-blue-600">Add, update, or delete crop information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-300 hover:shadow-lg transform transition-all duration-300"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-800">
              {currentCrop ? 'Update Crop' : 'Add New Crop'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Common Name
                </label>
                <input
                    type="text"
                    name="commonName"
                    defaultValue={currentCrop?.commonName}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Scientific Name
                </label>
                <input
                    type="text"
                    name="scientificName"
                    defaultValue={currentCrop?.scientificName}
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
                    defaultValue={currentCrop?.category}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Season
                </label>
                <input
                    type="text"
                    name="season"
                    defaultValue={currentCrop?.season}
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
                    defaultValue={currentCrop?.fieldId}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Image
                </label>
                <input type="file" accept="image/*" className="mt-1 block w-full" />
              </div>

              <div className="flex gap-2">
                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  {currentCrop ? 'Update Crop' : 'Add Crop'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setCurrentCrop(null)}
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
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-300 hover:shadow-lg transform transition-all duration-300"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-800">Crop List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Common Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Season
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                <AnimatePresence>
                  {crops.map((crop) => (
                      <motion.tr
                          key={crop.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-blue-100 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{crop.commonName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{crop.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{crop.season}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                              onClick={() => setCurrentCrop(crop)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                              onClick={() => {
                                setCrops(crops.filter(c => c.id !== crop.id));
                                toast.info('Crop deleted successfully!');
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

export default CropPage;

