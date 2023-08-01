import { expect } from 'chai';
import request from 'supertest';
import { app } from "../index.js";

describe('Auth Routes - Functional Tests', () => {
  it('should sign up a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    const response = await request(app).post('/api/signup').send(newUser);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User created successfully');
  });

  it('should return 409 if username already taken', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'password123',
    };
    const response = await request(app).post('/api/signup').send(existingUser);
    expect(response.status).to.equal(409);
    expect(response.body.error).to.equal('Username already taken');
  });

  it('should log in a user and return a JWT', async () => {
    const userCredentials = {
      emailOrUsername: 'existinguser',
      password: 'password123',
    };
    const response = await request(app).post('/api/login').send(userCredentials);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should return 401 for invalid login credentials', async () => {
    const userCredentials = {
      emailOrUsername: 'nonexistentuser',
      password: 'wrongpassword',
    };
    const response = await request(app).post('/api/login').send(userCredentials);
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('Invalid credentials');
  });

  it('should access protected route with a valid JWT', async () => {
    const userCredentials = {
      emailOrUsername: 'existinguser',
      password: 'password123',
    };
    const loginResponse = await request(app).post('/api/login').send(userCredentials);
    const token = loginResponse.body.token;
    const response = await request(app).get('/api/protected').set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Protected route accessed successfully');
  });

  it('should return 401 for accessing protected route without a JWT', async () => {
    const response = await request(app).get('/api/protected');
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('Access denied. No token provided.');
  });

  it('should return 401 for accessing protected route with an invalid JWT', async () => {
    const response = await request(app).get('/api/protected').set('Authorization', 'Bearer invalid-token');
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('Invalid token.');
  });
});
