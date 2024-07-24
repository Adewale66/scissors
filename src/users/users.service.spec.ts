import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { generateUser } from '../utils/generate-resource';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const user = generateUser();

  const mockUserRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return user', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(user));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword, ...data } = user;
      const result = await service.findOne('uud');
      expect(result).toBeDefined();
      expect(result).toEqual(data);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(null));
      expect(service.findOne('uuid')).rejects.toThrow(NotFoundException);
    });
  });
});
