import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FieldModel from "../models/FieldModel";

const FieldPage = () => {
    const [fields, setFields] = useState<FieldModel[]>([]);
    const [currentField, setCurrentField] = useState<FieldModel | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const newField: FieldModel = {
            id: currentField?.id || Math.random().toString(36).substr(2, 9),
            name: formData.get('name') as string,
            size: Number(formData.get('size')),
            location: {
                latitude: Number(formData.get('latitude')),
                longitude: Number(formData.get('longitude')),
            },
            images: {
                image1: currentField?.images.image1,
                image2: currentField?.images.image2,
            },
        };

        if (currentField) {
            setFields(fields.map(field => field.id === currentField.id ? newField : field));
            toast.success('Field updated successfully!');
        } else {
            setFields([...fields, newField]);
            toast.success('Field added successfully!');
        }

        form.reset();
        setCurrentField(null);
    };

    const handleDelete = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
        toast.info('Field deleted successfully!');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">Field Management</h1>
                    <p className="text-blue-600">Add, update, or delete field information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
                    whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
                >
                    <h2 className="text-lg font-semibold mb-4 text-blue-700">
                        {currentField ? 'Update Field' : 'Add New Field'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form fields remain the same */}
                        {/* ... */}
                        <div className="flex gap-2">
                            <motion.button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentField ? 'Update Field' : 'Add Field'}
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setCurrentField(null)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
                    <h2 className="text-lg font-semibold mb-4 text-blue-700">Field List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-blue-200">
                            <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                    Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-blue-200">
                            <AnimatePresence>
                                {fields.map((field) => (
                                    <motion.tr
                                        key={field.id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                                            {field.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                                            {field.size} acres
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                                            {field.location.latitude.toFixed(6)}, {field.location.longitude.toFixed(6)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <motion.button
                                                onClick={() => setCurrentField(field)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Edit
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleDelete(field.id)}
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

export default FieldPage;

