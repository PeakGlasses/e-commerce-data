// src/server/services/userService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRespository";
import logger from "../logger";

const JWT_SECRET = "your_jwt_secret_key";

export const userService = {
    // Register a new user
    async registerUser(name: string, email: string, password: string) {
        try {
            // Check if the user already exists
            const existingUser = await userRepository.findUserByEmail(email);
            if (existingUser) {
                throw new Error("User already exists");
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userRepository.createUser({
                name,
                email,
                password: hashedPassword,
            });

            logger.info(`New user registered: ${email}`);
            return { id: newUser.id, name, email };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Registration error: ${error.message}`);
                throw new Error(error.message);
            }
        }
    },

    // Login a user and generate a token
    async loginUser(email: string, password: string) {
        try {
            // Find user by email
            const user = await userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            logger.info(`User logged in: ${email}`);
            return { token };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Login error: ${error.message}`);
                throw new Error(error.message);
            }
        }
    },

    // Get user details by ID
    async getUserById(userId: number) {
        try {
            const user = await userRepository.findUserById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Get user details error: ${error.message}`);
                throw new Error(error.message);
            }
        }
    },
};
