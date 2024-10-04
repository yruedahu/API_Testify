import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';
import { check, validationResult } from 'express-validator';

export const register = [
    check('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('Correo no válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
