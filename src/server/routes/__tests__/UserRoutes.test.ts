import request from 'supertest';
import express, { Application } from 'express';
import userRoutes from '../../routes/UserRoutes';
import { userService } from '../../services/UserService';

jest.mock('../../services/UserService');

const app: Application = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes Integration Tests', () => {
  describe('POST /register', () => {
    it('should call the controller and return 201 for successful registration', async () => {
      (userService.registerUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

      const response = await request(app)
        .post('/api/users/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({ message: 'User registered successfully' }));
    });
  });

  describe('POST /login', () => {
    it('should call the controller and return 200 for successful login', async () => {
      (userService.loginUser as jest.Mock).mockResolvedValue({ token: 'valid-token' });

      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Login successful', token: 'valid-token' }));
    });
  });

  describe('GET /me', () => {
    it('should call the controller and return 200 for getting user profile', async () => {
      (userService.getUserById as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer 1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ id: 1, name: 'John Doe' }));
    });
  });
});
