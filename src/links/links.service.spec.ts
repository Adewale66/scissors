import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import QRCode from 'qrcode';
import { BadRequestException } from '@nestjs/common';

describe('LinksService', () => {
  let service: LinksService;
  let userRepository: Repository<Link>;
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
    userRepository = module.get<Repository<Link>>(getRepositoryToken(Link));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creating a short link', () => {
    it.skip('should successfully create a short link with alias', async () => {
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
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(link);
      jest.spyOn(QRCode, 'toDataURL').mockResolvedValue('qrcode');
      const result = await service.create(createLinkDto, ip);

      expect(result).toEqual({
        shortUrl: 'http://localhost:3000/google',
        qrcode: 'qrcode',
      });
    });

    it.skip('should successfully create a short link without alias', async () => {
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
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(link);
      jest.spyOn(QRCode, 'toDataURL').mockResolvedValue('qrcode');
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
  });
});
