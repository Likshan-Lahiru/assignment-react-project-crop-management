import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogModel from "../models/LogModel";

const LogPage = () => {
  const [logs, setLogs] = useState<LogModel[]>([]);
  const [currentLog, setCurrentLog] = useState<LogModel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newLog: LogModel = {
      id: currentLog?.id || Math.random().toString(36).substr(2, 9),
      date: formData.get('date') as string,
      details: formData.get('details') as string,
      imageUrl: currentLog?.imageUrl,
    };

    if (currentLog) {
      setLogs(logs.map(log => log.id === currentLog.id ? newLog : log));
      toast.success('Log updated successfully!');
    } else {
      setLogs([...logs, newLog]);
      toast.success('Log added successfully!');
    }

    form.reset();
    setCurrentLog(null);
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
            <h1 className="text-2xl font-bold text-blue-800">Log Management</h1>
            <p className="text-blue-600">Add, update, or delete log information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {currentLog ? 'Update Log' : 'Add New Log'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Date
                </label>
                <input
                    type="date"
                    name="date"
                    defaultValue={currentLog?.date}
                    className="form-input"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Details
                </label>
                <textarea
                    name="details"
                    defaultValue={currentLog?.details}
                    className="form-input"
                    rows={4}
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  {currentLog ? 'Update Log' : 'Add Log'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setCurrentLog(null)}
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
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Log List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                <AnimatePresence>
                  {logs.map((log) => (
                      <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">{log.date}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-blue-800 line-clamp-2">
                            {log.details}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                              onClick={() => setCurrentLog(log)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                              onClick={() => {
                                setLogs(logs.filter(l => l.id !== log.id));
                                toast.info('Log deleted successfully!');
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

export default LogPage;

