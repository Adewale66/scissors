import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { generateUser } from '../src/utils/generate-resource';
import { Repository } from 'typeorm';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let userRepository;

  const authGuardMock = {};

  const user = generateUser();

  const userRepositoryMock = {
    save: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userRepositoryMock)
      .overrideProvider(AuthGuard)
      .useValue(authGuardMock)
      .compile();
    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    await app.init();
  });

  describe('/users/{id} (GET)', () => {
    it('returns a user', () => {
      jest.spyOn(userRepository, 'findOneBy').mockReturnValue(user);
      return request(app.getHttpServer()).get('/users/uuid').expect(200);
    });

    it('throws an exception', () => {
      jest.spyOn(userRepository, 'findOneBy').mockReturnValue(null);
      return request(app.getHttpServer()).get('/users/random-uuid').expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
