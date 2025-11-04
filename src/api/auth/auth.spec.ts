import app from '../../app'
import prisma from '../../core/prisma'
import supertest from 'supertest'

const request = supertest(app);

describe('POST /api/v1/auth/register', () => {
    afterAll(async () => {
        await prisma.user.deleteMany()
    })

    it('should register a new user successfully', async () => {
        const testUser = {
            email:'naweltolioba@gmail.com',
            password:'Nawel1234!',
            first_name: 'nilows',
            last_name: 'tolioba'
        }
        const response = await request.post('/api/v1/auth/register').send(testUser);

        expect(response.status).toBe(201);
        expect(response.body.email).toBe(testUser.email);
        expect(response.body.first_name).toBe(testUser.first_name);
        expect(response.body.last_name).toBe(testUser.last_name);
        expect(response.body.password).toBeUndefined();
    })

    it('should fail to register a user with an existing email', async () => {
        const testUser = {
            email:'naweltolioba@gmail.com',
            password:'Nawel1234!',
            first_name: 'pollo',
            last_name: 'tolioba'
        }
        const response = await request.post('/api/v1/auth/register').send(testUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    })

    it('should fail to register an user without a password', async () => {
        const testUser = {
            email: 'pepelama@gmail.com',
            first_name: 'polinga',
            password: '123'
        }

        const response = await request.post('/api/v1/auth/register').send(testUser);

        expect(response.status).toBe(400);
        expect(response.body.error.password[0]).toBe('Password must be at least 6 characters long');
    })
})