import axios from 'axios';
import { faker } from '@faker-js/faker';

const REGISTER_URL = 'http://localhost:2500/apiTestify/v1/users/auth/register';

const generateUser = () => {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(10)
    };
};

const registerUser = async (user) => {
    try {
        const response = await axios.post(REGISTER_URL, user);
        console.log(`Usuario registrado: ${user.email}`);
        return response.data;
    } catch (error) {
        console.error(`Error al registrar usuario ${user.email}:`, error.response ? error.response.data : error.message);
    }
};

const massUserCreation = async (totalUsers) => {
    for (let i = 0; i < totalUsers; i++) {
        const newUser = generateUser();
        await registerUser(newUser);
    }
    console.log(`Se han registrado ${totalUsers} usuarios exitosamente.`);
};

massUserCreation(5000);
