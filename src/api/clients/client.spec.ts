
import supertest  from "supertest";
import prisma from "../../core/prisma";
import app from "../../app";



const request = supertest(app);

describe('Client API', () => {
    afterAll(async () => {
        await prisma.client.deleteMany({});
    })

    describe('POST /api/v1/clients', () => {


        it('should create a new client', async () => {
            // First, register and login a user to get a token
            const testUser = {
                email: 'naweltaverasyi@gmail.com',
                password: 'Nawel1234!',
                first_name: 'Nawel',
                last_name: 'Taveras'
            }

            await request.post('/api/v1/auth/register').send(testUser);
            const loginResponse = await request.post('/api/v1/auth/login').send({
                email: testUser.email,
                password: testUser.password
            })
            const token = loginResponse.body.token;
            const response = await request.post('/api/v1/client').send({
                name: 'Test Client'
            }).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(201);
            expect(response.body.userId).toBeDefined();
            expect(response.body.name).toBe('Test Client');



        })

        



    })


});