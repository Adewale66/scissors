import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import QRCode from 'qrcode';
import { generateShort, validateUrl } from '../utils/generate-custom-url';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
    private readonly configService: ConfigService,
  ) {}

  async create(createLinkDto: CreateLinkDto, ip: string) {
    const original = validateUrl(createLinkDto.originalUrl);
    if (!original) {
      throw new BadRequestException('Invalid URL');
    }
    const short = generateShort(original, createLinkDto.alias);

    const shortUrl = this.configService.get('API_URL') + '/' + short;
    const qrcode = await QRCode.toDataURL(shortUrl);
    const link = new Link();
    link.key = short;
    link.shortUrl = shortUrl;
    link.originalUrl = original;
    link.qrcode = qrcode;
    link.ip = ip;
    await this.linkRepository.save(link);

    return {
      shortUrl,
      qrcode,
    };
  }

  async findAll(ip: string, page, pageSize) {
    const page_no = parseInt(page) || 1;
    const page_size = parseInt(pageSize) || 5;

    const offset = (page_no - 1) * page_size;
    const limit = page_size;

    const totalPages = await this.linkRepository.findAndCount();
    const pages = await this.linkRepository.findAndCount({
      where: {
        ip,
      },
      order: {
        createdAt: {
          direction: 'DESC',
        },
      },
      take: limit,
      skip: offset,
    });

    return {
      data: pages[0],
      totalPages: Math.ceil(totalPages[1] / page_size),
      pageSize: page_size,
    };
  }

  async findShort(key: string) {
    const url = await this.linkRepository.findOne({
      where: {
        key,
      },
    });
    return url;
  }

  async update(link: Link) {
    link.clicks++;
    await this.linkRepository.save(link);
  }
}
