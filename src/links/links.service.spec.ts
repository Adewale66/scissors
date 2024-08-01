import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('LinksService', () => {
  let service: LinksService;
  let userRepository: Repository<Link>;
  let configService: ConfigService;

  const repositoryMock = {
    findOneBy: jest.fn(),
  };

  const configServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: repositoryMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    userRepository = module.get<Repository<Link>>(getRepositoryToken(Link));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
