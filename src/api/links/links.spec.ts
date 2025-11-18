
import Request  from "supertest";
import app from  '../../app' 
import prisma from "../../core/prisma";
import { Response } from "supertest";


const request = Request(app);


describe('LINKS API', () => {
    let getClient: Response;
    let token: Response;
        beforeAll(async () => {
            const registerUser = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'naweltv@gmail.com',
                password: 'password123'
            }
            await request.post('/api/v1/auth/register').send(registerUser);
            token = await request.post('/api/v1/auth/login').send({email: registerUser.email, password: registerUser.password});
            const createClient = {
                name: 'Test Client',
            }
             getClient = await request.post('/api/v1/client').set('Authorization', `Bearer ${token.body.token}`).send(createClient);

            

        });
        afterAll(async () => {
            await prisma.link.deleteMany({});
            await prisma.client.deleteMany({});
            await prisma.user.deleteMany({});
        })

    describe('POST /api/v1/links', () => {
      
        it('should create a new link', async () => {
            const body = {
                title: 'Test Link',
                url: 'https://example.com',
                clientId: getClient.body.id 

            }
            const response = await request.post('/api/v1/links').set('Authorization', `Bearer ${token.body.token}`).send(body);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(body.title);
            expect(response.body.url).toBe(body.url);
            expect(response.body.clientId).toBe(body.clientId);
        });

        it('should return 400 if required field URL is wrong (zod validation)', async () => {
            const body = {
                title: 'Test Link',
                url: 'invalida',
                clientId: getClient.body.id
            }
            const response = await request.post('/api/v1/links').set('Authorization', `Bearer ${token.body.token}`).send(body);

           
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeInstanceOf(Array);
        });
        it('should return 400 if client does not exist with false CUID for clientId field (controller/service error)', async () => {
            const body = {
                title: 'Test Link',
                url: 'https://example.com',
                clientId: 'cku4f8q7p0001x9m4n7y2h3zt'

            }
            const response = await request.post('/api/v1/links').set('Authorization', `Bearer ${token.body.token}`).send(body);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Client does not exist');
        });
    });

    describe('GET /api/v1/links', () => {
        it('get array with all the links for a specific client', async ()=>{
            

            const getLinks = await request.get(`/api/v1/links/${getClient.body.id}`).set('Authorization', `Bearer ${token.body.token}`)

            
            expect(getLinks.status).toBe(200)
            expect(getLinks.body).toBeInstanceOf(Array)
        })

        it("should return 400 with params with a different format than CUID", async()=>{

            const getLinks = await request.get(`/api/v1/links/123123123123`).set('Authorization', `Bearer ${token.body.token}`)

            expect(getLinks.status).toBe(400)
            expect(getLinks.body.errors).toBeInstanceOf(Array)
        })

        it("should return 400 but with a wrong CUID", async()=>{

            const getLinks = await request.get('/api/v1/links/cjk1z1e5q0001k9y7a3x9d2tf').set('Authorization', `Bearer ${token.body.token}`)

            expect(getLinks.status).toBe(400)
            expect(getLinks.body).toEqual(
                expect.objectContaining({
                    errors: expect.any(String)
                })
            )
        })
    })
});