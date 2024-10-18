import { userService } from '../../services/UserService';
import { userRepository } from '../../repositories/UserRespository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../../logger';

jest.mock('../../repositories/UserRespository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../logger');

describe('UserService', () => {

  describe('registerUser', () => {
    beforeEach(() => {
        // Clear mock implementations and data before each test
        jest.clearAllMocks();
      });
    it('should register a new user successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashed_password' };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null); // No existing user
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      (userRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.registerUser('John Doe', 'john@example.com', 'password123');

      expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith('john@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', password: 'hashed_password' });
      expect(logger.info).toHaveBeenCalledWith('New user registered: john@example.com');
    });

    it('should throw an error if the user already exists', async () => {
        (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'john@example.com' });

      await expect(userService.registerUser('John Doe', 'john@example.com', 'password123'))
        .rejects
        .toThrow('User already exists');

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith('john@example.com');
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });

    it('should handle registration errors and log them', async () => {
      (userRepository.findUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.registerUser('John Doe', 'john@example.com', 'password123'))
        .rejects
        .toThrow('Database error');

      expect(logger.error).toHaveBeenCalledWith('Registration error: Database error');
    });
  });

  describe('loginUser', () => {
    it('should log in a user successfully and return a token', async () => {
      const mockUser = { id: 1, email: 'john@example.com', password: 'hashed_password' };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake_token');

      const result = await userService.loginUser('john@example.com', 'password123');

      expect(result).toEqual({ token: 'fake_token' });
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith('john@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, 'your_jwt_secret_key', { expiresIn: '1h' });
      expect(logger.info).toHaveBeenCalledWith('User logged in: john@example.com');
    });

    it('should throw an error for invalid email or password', async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null); // User not found

      await expect(userService.loginUser('john@example.com', 'password123'))
        .rejects
        .toThrow('Invalid email or password');

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith('john@example.com');
    });

    it('should throw an error for incorrect password', async () => {
      const mockUser = { id: 1, email: 'john@example.com', password: 'hashed_password' };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Incorrect password

      await expect(userService.loginUser('john@example.com', 'wrong_password'))
        .rejects
        .toThrow('Invalid email or password');

      expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
    });

    it('should handle login errors and log them', async () => {
      (userRepository.findUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.loginUser('john@example.com', 'password123'))
        .rejects
        .toThrow('Database error');

      expect(logger.error).toHaveBeenCalledWith('Login error: Database error');
    });
  });

  describe('getUserById', () => {
    it('should return user details by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      (userRepository.findUserById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user is not found', async () => {
      (userRepository.findUserById as jest.Mock).mockResolvedValue(null); // User not found

      await expect(userService.getUserById(1))
        .rejects
        .toThrow('User not found');

      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    });

    it('should handle getUserById errors and log them', async () => {
      (userRepository.findUserById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.getUserById(1))
        .rejects
        .toThrow('Database error');

      expect(logger.error).toHaveBeenCalledWith('Get user details error: Database error');
    });
  });
});
