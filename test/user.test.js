import request from 'supertest';
import app from '../server.js';
import { configDotenv } from 'dotenv';
configDotenv();

const mockToken = process.env.TEST_TOKEN

describe('Testing Users API', () => {
    test('Debe obtener todos los usuarios con un token válido', async () => {
        const response = await request(app)
            .get('/apiTestify/v1/users/getUsers')
            .set('Authorization', mockToken);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Debe fallar al intentar obtener usuarios sin token', async () => {
        const response = await request(app)
            .get('/apiTestify/v1/users/getUsers');

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Token requerido');
    });
});
