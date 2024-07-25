import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import QRCode from 'qrcode';
import { CustomLinkDto } from './dto/custom-link.dto';
import {
  generateCustomUrl,
  generateUrl,
  validateUrl,
} from '../utils/generate-custom-url';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
    private readonly configService: ConfigService,
  ) {}
  custom(customDto: CustomLinkDto, user: User) {
    const original = validateUrl(customDto.originalUrl);
    if (!original) {
      throw new BadRequestException('Invalid URL');
    }
    const shortUrl = generateCustomUrl(original, customDto.domain);
    return this.sendResponse(shortUrl, original, user);
  }

  create(createLinkDto: CreateLinkDto) {
    const original = validateUrl(createLinkDto.originalUrl);
    if (!original) {
      throw new BadRequestException('Invalid URL');
    }
    const shortUrl = generateUrl(original);
    return this.sendResponse(shortUrl, original);
  }
  async sendResponse(short: string, originalUrl: string, user?: User) {
    const fullUrl = this.configService.get('API_URL') + '/' + short;
    const qrcodeUrl = await QRCode.toDataURL(fullUrl);
    const link = new Link();
    link.domain = short;
    link.originalUrl = originalUrl;
    link.user = user;
    await this.linkRepository.save(link);

    return {
      fullUrl,
      qrcode: qrcodeUrl,
    };
  }

  async findAll(user: User) {
    return await this.linkRepository.find({
      where: {
        user,
      },
    });
  }

  async findShort(short: string) {
    const url = await this.linkRepository.findOne({
      where: {
        domain: short,
      },
    });
    return url;
  }

  async update(link: Link) {
    await this.linkRepository.save(link);
  }

  async remove(domain: string, user: User) {
    const link = await this.linkRepository.findOne({
      where: {
        domain,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }
    if (link.user.username !== user.username) {
      throw new ForbiddenException('Not allowed to delete this resource');
    }
    await this.linkRepository.delete(link);

    return;
  }
}
