import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;


const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Conexión Exitosa en DB');

    } catch (err) {
        console.error('Error en conexión mongo DB', err);
    }
};

connectDB();

export default mongoose.connection; 
