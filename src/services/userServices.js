import User from '../models/usersModel.js';

export const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error al obtener usuarios');
    }
};
