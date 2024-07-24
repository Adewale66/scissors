import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { generateUser } from '../utils/generate-resource';
import * as argon2 from 'argon2';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const user = generateUser();

  const userServiceMock = {
    findByUsername: jest.fn(),
    saveUser: jest.fn(),
  };
  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    })

      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const loginDto = {
      username: 'username@123.com',
      password: 'password123',
    };
    it('should sign a user in', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('jwttoken');

      const result = await service.signIn(loginDto);

      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(argon2.verify).toHaveBeenCalled();
      expect(result.access_token).toBeDefined();
      expect(result.access_token).toBe('jwttoken');
    });

    it('should not sign in a user on false email', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);
      expect(service.signIn(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should not sign in a user on false password', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(false);
      expect(service.signIn(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    const registerDto = {
      username: 'email@123.com',
      password: 'password123',
    };
    it('should register a user', async () => {
      jest.spyOn(argon2, 'hash').mockResolvedValueOnce('hashedpassword');
      jest.spyOn(usersService, 'saveUser').mockImplementation(() => {
        return Promise.resolve({
          message: 'User created successfully.',
        });
      });

      const result = await service.register(registerDto);
      expect(result.message).toBe('User created successfully.');
    });
  });
});
