import request from 'supertest';
import express, { Application } from 'express';
import { userController } from '../../controllers/UserController';
import { userService } from '../../services/UserService';
import logger from '../../logger';
jest.mock('../../services/UserService');
jest.mock('../../logger');

const app: Application = express();
app.use(express.json());
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/profile', userController.getProfile);

describe('UserController Tests', () => {
  describe('POST /register', () => {
    it('should return 201 and user data when registration is successful', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      (userService.registerUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User registered successfully', user: mockUser });
      expect(userService.registerUser).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).post('/register').send({ name: 'John Doe' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Please provide all required fields' });
    });

    it('should return 500 if an error occurs during registration', async () => {
      (userService.registerUser as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error registering user' });
      expect(logger.error).toHaveBeenCalledWith('Controller Error: Service error');
    });
  });

  describe('POST /login', () => {
    it('should return 200 and a token when login is successful', async () => {
      (userService.loginUser as jest.Mock).mockResolvedValue({ token: 'valid-token' });

      const response = await request(app)
        .post('/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Login successful', token: 'valid-token' });
      expect(userService.loginUser).toHaveBeenCalledWith('john@example.com', 'password123');
    });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app).post('/login').send({ email: 'john@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Please provide email and password' });
    });

    it('should return 500 if an error occurs during login', async () => {
      (userService.loginUser as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error logging in' });
      expect(logger.error).toHaveBeenCalledWith('Controller Error: Service error');
    });
  });

  describe('GET /profile', () => {
    it('should return 200 and user data when profile is retrieved successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer 1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith(1);
    });

    it('should return 401 if authorization header is missing or invalid', async () => {
      const response = await request(app).get('/profile');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized access' });
    });

    it('should return 500 if an error occurs during profile retrieval', async () => {
      (userService.getUserById as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer 1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error fetching user details' });
      expect(logger.error).toHaveBeenCalledWith('Controller Error: Service error');
    });
  });
});
