import { User, userRepository } from '../UserRespository';

describe('User Repository', () => {
  let mockUsers: User[];

  beforeEach(() => {
    // Reset the mock users array before each test
    mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashedPassword1' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'hashedPassword2' },
    ];

    // Reset the users array in userRepository to mockUsers
    jest.spyOn(userRepository, 'createUser').mockImplementation((user) => {
      const newUser: User = { id: mockUsers.length + 1, ...user };
      mockUsers.push(newUser);
      return Promise.resolve(newUser);
    });

    jest.spyOn(userRepository, 'findUserByEmail').mockImplementation((email) => {
      return Promise.resolve(mockUsers.find(user => user.email === email));
    });

    jest.spyOn(userRepository, 'findUserById').mockImplementation((userId) => {
      return Promise.resolve(mockUsers.find(user => user.id === userId));
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const newUser = { name: 'New User', email: 'newuser@example.com', password: 'password123' };

      const createdUser = await userRepository.createUser(newUser);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.name).toBe(newUser.name);
      expect(createdUser.email).toBe(newUser.email);
      expect(mockUsers).toContainEqual(createdUser); // Ensure user was added to the users array
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user when email exists', async () => {
      const email = 'john@example.com';
      const foundUser = await userRepository.findUserByEmail(email);

      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(email);
    });

    it('should return undefined when email does not exist', async () => {
      const email = 'nonexistent@example.com';
      const foundUser = await userRepository.findUserByEmail(email);

      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUserById', () => {
    it('should return a user when ID exists', async () => {
      const userId = 1;
      const foundUser = await userRepository.findUserById(userId);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(userId);
    });

    it('should return undefined when ID does not exist', async () => {
        const userId = 999;
        const foundUser = await userRepository.findUserById(userId);

        expect(foundUser).toBeUndefined();
        });
    })
})
