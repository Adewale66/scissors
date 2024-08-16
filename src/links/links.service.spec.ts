import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe('LinksService', () => {
  let service: LinksService;
  let repository: Repository<Link>;
  let configService: ConfigService;

  const repositoryMock = {
    save: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn(),
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
    repository = module.get<Repository<Link>>(getRepositoryToken(Link));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creating a short link', () => {
    it('should successfully create a short link with alias', async () => {
      const createLinkDto = {
        originalUrl: 'https://www.google.com',
        alias: 'google',
      };
      const ip = '127.0.0.1';
      const link = new Link();
      link.key = 'google';
      link.shortUrl = 'http://localhost:3000/google';
      link.originalUrl = 'https://www.google.com';
      link.qrcode = 'qrcode';
      link.ip = ip;

      jest.spyOn(configService, 'get').mockReturnValue('http://localhost:3000');
      jest.spyOn(repository, 'save').mockResolvedValueOnce(link);
      const result = await service.create(createLinkDto, ip);

      expect(result).toBeDefined();
    });

    it('should successfully create a short link without alias', async () => {
      const createLinkDto = {
        originalUrl: 'https://www.google.com',
        alias: '',
      };
      const ip = '127.0.0.1';
      const link = new Link();
      link.key = 'google';
      link.shortUrl = 'http://localhost:3000/google';
      link.originalUrl = 'https://www.google.com';
      link.qrcode = 'qrcode';
      link.ip = ip;

      jest.spyOn(configService, 'get').mockReturnValue('http://localhost:3000');
      jest.spyOn(repository, 'save').mockResolvedValueOnce(link);
      const result = await service.create(createLinkDto, ip);

      expect(result).toBeDefined();
    });

    it('should throw an error for an invalid URL', async () => {
      const createLinkDto = {
        originalUrl: 'google',
        alias: '',
      };
      const ip = '127.0.0.1';

      expect(service.create(createLinkDto, ip)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error for a short alias', async () => {
      const createLinkDto = {
        originalUrl: 'http://www.google.com',
        alias: 'abc',
      };
      const ip = '127.0.0.1';

      expect(service.create(createLinkDto, ip)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error for a long alias', async () => {
      const createLinkDto = {
        originalUrl: 'http://www.google.com',
        alias: 'abcdefghijklmnopqrstuvwxyz',
      };
      const ip = '127.0.0.1';

      expect(service.create(createLinkDto, ip)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
