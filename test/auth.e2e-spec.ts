import * as argon2 from 'argon2';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { generateUser } from '../src/utils/generate-resource';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../src/users/users.service';

describe('Auth routes (e2e)', () => {
  let app: INestApplication;
  let userService;
  let jwtService;

  const user = generateUser();

  const userRepositoryMock = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  const authGuardMock = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userRepositoryMock)
      .overrideProvider(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UsersService>(UsersService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();
  });

  describe('/auth/register (POST)', () => {
    it('register a user', () => {
      const registerDto = {
        username: 'username@123',
        password: 'password',
      };
      jest.spyOn(userService, 'saveUser').mockImplementation(() =>
        Promise.resolve({
          message: 'User created successfully.',
        }),
      );
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body.message).toEqual('User created successfully.');
        });
    });
  });

  describe('/auth/login (POST) ', () => {
    it('login a user', () => {
      const loginDto = {
        username: 'username@123',
        password: 'password',
      };
      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(() => Promise.resolve(user));
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('jwttoken');
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.access_token).toEqual('jwttoken');
        });
    });

    it('should return a 401 for invalid email', () => {
      const loginDto = {
        username: 'username@123',
        password: 'password',
      };
      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(() => Promise.resolve(null));
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .then((res) => {
          expect(res.body.message).toEqual('Invalid Email');
        });
    });

    it('should return a 401 on invalid password', () => {
      const loginDto = {
        username: 'username@123',
        password: 'password',
      };
      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(() => Promise.resolve(user));
      jest.spyOn(argon2, 'verify').mockResolvedValue(false);
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .then((res) => {
          expect(res.body.message).toEqual('Invalid Password');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
