import User from '../models/usersModel.js';

export const getAllUsers = async () => await User.find();
export const getUser = async (id) => await User.findById(id);
export const updateUser = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
export const deleteUser = async (id) => await User.findByIdAndDelete(id);