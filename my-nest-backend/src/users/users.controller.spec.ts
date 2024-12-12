import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a mock UsersService with jest.fn() for methods
    mockUsersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        first_name:'Arnaud',
        last_name: 'Norel',
        password: 'password123'
      };

      const expectedResult = { id: 1, ...createUserDto };
      
      (mockUsersService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.create(createUserDto);
      
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' }
      ];

      (mockUsersService.findAll as jest.Mock).mockResolvedValue(expectedUsers);

      const result = await controller.findAll();
      
      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const expectedUser = { id: 1, username: 'testuser', email: 'test@example.com' };

      (mockUsersService.findOne as jest.Mock).mockResolvedValue(expectedUser);

      const result = await controller.findOne('1');
      
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'testuser',
        first_name:'Arnaud',
        last_name: 'Norel',
        password: 'password123'
    };

      const expectedResult = { id: 1, username: 'testuser', ...updateUserDto };

      (mockUsersService.update as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.update('1', updateUserDto);
      
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const expectedResult = { deleted: true };

      (mockUsersService.remove as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.remove('1');
      
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });
});