import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModel from "../models/userModel";

const SettingPage = () => {
    const [settings, setSettings] = useState<UserModel>({
        email: 'lahiru@gmail.com',
        role: 'MANAGER',
        roleCode: 'M00-001',
    });

    const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        setSettings({
            ...settings,
            role: formData.get('role') as UserModel['role'],
            roleCode: formData.get('roleCode') as string,
        });

        toast.success('Settings updated successfully');
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);


        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }


        toast.success('Password changed successfully');
        form.reset();
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (confirmed) {
            // Handle account deletion
            toast.info('Account deleted successfully');
        }
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
                    <h1 className="text-2xl font-bold text-blue-800">Account Settings</h1>
                    <p className="text-blue-600">Manage your account preferences and security</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <motion.div
                        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
                        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-blue-700">General Settings</h2>
                        <form onSubmit={handleSettingsSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    disabled
                                    className="form-input bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    defaultValue={settings.role}
                                    className="form-input"
                                >
                                    <option value="MANAGER">Manager</option>
                                    <option value="ADMINISTRATIVE">Administrative</option>
                                    <option value="SCIENTIST">Scientist</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    Role Code
                                </label>
                                <input
                                    type="text"
                                    name="roleCode"
                                    defaultValue={settings.roleCode}
                                    className="form-input"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Save Changes
                            </motion.button>
                        </form>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
                        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-blue-700">Change Password</h2>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-700">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Change Password
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
                    whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)" }}
                >
                    <h2 className="text-lg font-semibold mb-4 text-blue-700">Danger Zone</h2>
                    <div className="space-y-4">
                        <div className="p-4 border border-red-200 rounded-md bg-red-50">
                            <h3 className="text-red-800 font-medium">Delete Account</h3>
                            <p className="text-sm text-red-600 mt-1">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <motion.button
                                onClick={handleDeleteAccount}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Delete Account
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </motion.div>
    );
};

export default SettingPage;

