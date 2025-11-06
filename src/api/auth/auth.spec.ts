import { id } from 'zod/v4/locales';
import app from '../../app'
import prisma from '../../core/prisma'
import supertest from 'supertest'

const request = supertest(app);

describe('Auth API', () => {
    afterAll(async () => {
        await prisma.user.deleteMany()
    })

    describe('POST /api/v1/auth/register', () => {
    

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
        expect(response.body.error[0]).toBe('Password must be at least 6 characters long');
    })
   })
   describe('POST /api/v1/auth/login', () => {
     
        it('should login an existing user successfully', async () => {
            const loginData = {
                email: 'naweltolioba@gmail.com',
                password:'Nawel1234!'
            }

            const response = await request.post('/api/v1/auth/login').send(loginData);

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        })

         it('should fail login with non existing email', async () => {
            const loginData = {
                email: 'naweltoloba@gmail.com',
                password:'Nawel1234!'
            }

            const response = await request.post('/api/v1/auth/login').send(loginData);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email');
        })

   })

    describe('GET /api/v1/auth/me', () => {
        it('should get the authenticated user info', async () => {
             const loginData = {
                email: 'naweltolioba@gmail.com',
                password:'Nawel1234!'
            }

            const loginReponse = await request.post('/api/v1/auth/login').send(loginData);
            const token = loginReponse.body.token;
            const response = await request.get('/api/v1/auth/me').set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.role).toBeDefined();

        })
        it('should fail to get user info with invalid token', async () => {
            const token = 'meloinventochaval'

            const response = await request.get('/api/v1/auth/me').set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid token');
        })
    })

})

