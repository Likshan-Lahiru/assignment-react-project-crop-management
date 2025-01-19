import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffModel from "../models/staffModel";

const StaffPage = () => {
  const [staff, setStaff] = useState<StaffModel[]>([]);
  const [currentStaff, setCurrentStaff] = useState<StaffModel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newStaff: StaffModel = {
      id: currentStaff?.id || Math.random().toString(36).substr(2, 9),
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      designation: formData.get('designation') as string,
      gender: formData.get('gender') as 'MALE' | 'FEMALE',
      joinedDate: formData.get('joinedDate') as string,
      dob: formData.get('dob') as string,
      address: {
        buildingNo: formData.get('buildingNo') as string,
        lane: formData.get('lane') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        postalCode: formData.get('postalCode') as string,
      },
      contactNo: formData.get('contactNo') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'MANAGER' | 'ADMINISTRATIVE' | 'SCIENTIST' | 'OTHER',
    };

    if (currentStaff) {
      setStaff(staff.map(s => s.id === currentStaff.id ? newStaff : s));
      toast.success('Staff updated successfully!');
    } else {
      setStaff([...staff, newStaff]);
      toast.success('Staff added successfully!');
    }

    form.reset();
    setCurrentStaff(null);
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
            <h1 className="text-2xl font-bold text-blue-800">Staff Management</h1>
            <p className="text-blue-600">Add, update, or delete staff information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {currentStaff ? 'Update Staff' : 'Add New Staff'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    First Name
                  </label>
                  <input
                      type="text"
                      name="firstName"
                      defaultValue={currentStaff?.firstName}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Last Name
                  </label>
                  <input
                      type="text"
                      name="lastName"
                      defaultValue={currentStaff?.lastName}
                      className="form-input"
                      required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Designation
                </label>
                <input
                    type="text"
                    name="designation"
                    defaultValue={currentStaff?.designation}
                    className="form-input"
                    required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Gender
                  </label>
                  <select
                      name="gender"
                      defaultValue={currentStaff?.gender}
                      className="form-input"
                      required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Role
                  </label>
                  <select
                      name="role"
                      defaultValue={currentStaff?.role}
                      className="form-input"
                      required
                  >
                    <option value="MANAGER">Manager</option>
                    <option value="ADMINISTRATIVE">Administrative</option>
                    <option value="SCIENTIST">Scientist</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Joined Date
                  </label>
                  <input
                      type="date"
                      name="joinedDate"
                      defaultValue={currentStaff?.joinedDate}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Date of Birth
                  </label>
                  <input
                      type="date"
                      name="dob"
                      defaultValue={currentStaff?.dob}
                      className="form-input"
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Contact Number
                  </label>
                  <input
                      type="tel"
                      name="contactNo"
                      defaultValue={currentStaff?.contactNo}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Email
                  </label>
                  <input
                      type="email"
                      name="email"
                      defaultValue={currentStaff?.email}
                      className="form-input"
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Building No
                  </label>
                  <input
                      type="text"
                      name="buildingNo"
                      defaultValue={currentStaff?.address.buildingNo}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Lane
                  </label>
                  <input
                      type="text"
                      name="lane"
                      defaultValue={currentStaff?.address.lane}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    City
                  </label>
                  <input
                      type="text"
                      name="city"
                      defaultValue={currentStaff?.address.city}
                      className="form-input"
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    State
                  </label>
                  <input
                      type="text"
                      name="state"
                      defaultValue={currentStaff?.address.state}
                      className="form-input"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">
                    Postal Code
                  </label>
                  <input
                      type="text"
                      name="postalCode"
                      defaultValue={currentStaff?.address.postalCode}
                      className="form-input"
                      required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  {currentStaff ? 'Update Staff' : 'Add Staff'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setCurrentStaff(null)}
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
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Staff List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                <AnimatePresence>
                  {staff.map((person) => (
                      <motion.tr
                          key={person.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                          {person.firstName} {person.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                          {person.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {person.role}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                              onClick={() => setCurrentStaff(person)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                              onClick={() => {
                                setStaff(staff.filter(s => s.id !== person.id));
                                toast.info('Staff deleted successfully!');
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

export default StaffPage;

