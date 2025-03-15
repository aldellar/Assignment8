import {it, beforeAll, afterAll, expect} from 'vitest';
import supertest from 'supertest';
import http from 'http';
import app from '../src/app.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

let server;
let request;
beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(async () => {
  await server.close();
});
it('Errors on GET Invalid URL', async () => {
    await request.get('/api/v0/so-not-a-real-end-point')
        .expect(404);
});
it('Returns name and access token on valid credentials', async () => {
    const response = await request.post('/api/v0/login')
        .send({email: "molly@books.com", password: "mollymember"})
        .expect(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('accessToken');
});
it('Rejects invalid credentials', async () => {
    const response = await request.post('/api/v0/login')
        .send({email: "fakeEmail@books.com", password: "mollymember"})
        .expect(401);
    expect(response.text).toBe('Invalid credentials');
});
it('Returns workspaces for valid userID', async () => {
    const token = jwt.sign(
        { id: 'f2ad0728-9d47-4e48-ac63-78a812ab6cab', email: 'test@books.com' },
        'XZBN24IQYIxd9meHiZu68xMkE5wNxwuy',
        { expiresIn: '1h', algorithm: 'HS256' }
    );
    const response = await request.get('/api/v0/workspaces')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
});
it('Rejects invalid JWT token', async () => {
    const invalidToken = jwt.sign(
        { id: 'f2ad0728-9d47-4e48-ac63-78a812ab6cab', email: 'test@books.com' },
        'XZBN24IQYIxd9meHiZu68xMkE5sNxwuy',
        { expiresIn: '1h', algorithm: 'HS256' }
    );
    await request.get('/api/v0/workspaces')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(500);
});