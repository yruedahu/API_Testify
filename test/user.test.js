import request from 'supertest';
import app from '../server.js';
import { configDotenv } from 'dotenv';
configDotenv();

const mockToken = process.env.TEST_TOKEN;

describe('Testing Users API', () => {
    // Prueba 1: Obtener todos los usuarios con un token válido
    test('Debe obtener todos los usuarios con un token válido', async () => {
        const response = await request(app)
            .get('/apiTestify/v1/users/getUsers')
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    // Prueba 2: Obtener todos los usuarios sin token
    test('Debe fallar al intentar obtener usuarios sin token', async () => {
        const response = await request(app)
            .get('/apiTestify/v1/users/getUsers');

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Token requerido');
    });

    // Prueba 3: Obtener usuario por ID válido
    test('Debe obtener usuario por ID con un token válido', async () => {
        const userId = '66ff4f198a8bb03f9447bfff';
        const response = await request(app)
            .get(`/apiTestify/v1/users/getUserById/${userId}`)
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
    });

    // Prueba 4: Obtener usuario con un ID no existente
    test('Debe devolver error 404 al obtener un usuario con un ID no existente', async () => {
        const nonExistentUserId = '66ff4f198a8bb03f9447bf00';
        const response = await request(app)
            .get(`/apiTestify/v1/users/getUserById/${nonExistentUserId}`)
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Usuario no encontrado');
    });

    // Prueba 5: Registrar un nuevo usuario
    test('Debe registrar un nuevo usuario', async () => {
        const newUser = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        };
        const response = await request(app)
            .post('/apiTestify/v1/users/auth/register')
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    });

    // Prueba 6: Iniciar sesión con usuario registrado
    test('Debe iniciar sesión con un usuario registrado', async () => {
        const credentials = {
            email: 'testuser@example.com',
            password: 'password123'
        };
        const response = await request(app)
            .post('/apiTestify/v1/users/auth/login')
            .send(credentials);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Prueba 7: Registrar usuario con email existente
    test('Debe fallar al registrar un usuario con email ya existente', async () => {
        const existingUser = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        };
        const response = await request(app)
            .post('/apiTestify/v1/users/auth/register')
            .send(existingUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('El email ya está registrado');
    });

    // Prueba 8: Actualizar información de un usuario
    test('Debe actualizar la información de un usuario', async () => {
        const userId = '66ff4f198a8bb03f9447bffd';
        const updatedData = {
            name: 'Updated User'
        };
        const response = await request(app)
            .put(`/apiTestify/v1/users/updateUserById/${userId}`)
            .set('Authorization', mockToken)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated User');
    });

    // Prueba 9: Eliminar un usuario por ID válido
    test('Debe eliminar un usuario por ID válido', async () => {
        const userIdToDelete = '66ff4f208a8bb03f9447c065';
        const response = await request(app)
            .delete(`/apiTestify/v1/users/deleteUserById/${userIdToDelete}`)
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Usuario eliminado exitosamente');
    });

    // Prueba 10: Eliminar un usuario con un ID no existente
    test('Debe devolver error 404 al intentar eliminar un usuario con un ID no existente', async () => {
        const nonExistentUserId = '66ff4f208a8bb03f9447c065';
        const response = await request(app)
            .delete(`/apiTestify/v1/users/deleteUserById/${nonExistentUserId}`)
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Usuario no encontrado');
    });
});
