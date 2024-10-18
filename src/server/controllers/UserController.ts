// src/server/controllers/userController.ts
import { Request, Response } from 'express';
import { userService } from '../services/UserService';
import logger from "../logger";


export const userController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const user = await userService.registerUser(name, email, password);
      return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Controller Error: ${error.message}`);
            return res.status(500).json({ message: 'Error registering user' });
        }
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }

      const result = await userService.loginUser(email, password);
      return res.status(200).json({ message: 'Login successful', token: result?.token });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Controller Error: ${error.message}`);
            return res.status(500).json({ message: 'Error logging in' });
        }
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }

      const token = authHeader.split(' ')[1];
      const user = await userService.getUserById(parseInt(token));

      return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Controller Error: ${error.message}`);
            return res.status(500).json({ message: 'Error fetching user details' });
        }
    }
  },
};

