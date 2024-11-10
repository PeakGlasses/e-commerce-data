export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

// Mock database (Replace with real DB calls, like MongoDB or SQL)
const users: User[] = [];

export const userRepository = {
    // Create a new user
    async createUser(user: Omit<User, "id">): Promise<User> {
        try {
            const newUser: User = { id: users.length + 1, ...user };
            users.push(newUser);
            return newUser;
        } catch (error) {
            throw new Error("Error creating user in the database");
        }
    },

    // Find a user by email
    async findUserByEmail(email: string): Promise<User | undefined> {
        try {
            return users.find((user) => user.email === email);
        } catch (error) {
            throw new Error("Error finding user in the database");
        }
    },

    // Find a user by ID
    async findUserById(userId: number): Promise<User | undefined> {
        try {
            return users.find((user) => user.id === userId);
        } catch (error) {
            throw new Error("Error finding user in the database");
        }
    },
};
