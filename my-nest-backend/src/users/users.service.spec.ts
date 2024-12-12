import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  // Mock User Data
  const mockUser = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    password: 'hashedpassword',
  };

  // Mock Repository
  const mockRepository = {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  // Test the create method
  // it('should create a new user with a hashed password', async () => {
  //   const createUserDto = {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     username: 'johndoe',
  //     password: 'password123',
  //   };

  //   const hashedPassword: string = 'hashedpassword';
  //   // TODO fix problem with type "never"
  //   // jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

  //   const result = await service.create(createUserDto);

  //   expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
  //   expect(repository.create).toHaveBeenCalledWith({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });
  //   expect(repository.save).toHaveBeenCalledWith(mockUser);
  //   expect(result).toEqual(mockUser);
  // });

  // Test the findByUsername method
  it('should return a user by username', async () => {
    const username = 'johndoe';
    const result = await service.findByUsername(username);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { username } });
    expect(result).toEqual(mockUser);
  });  
});
