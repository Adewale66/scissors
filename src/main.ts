import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedFilter } from './exceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new QueryFailedFilter());
  app.useGlobalFilters(new QueryFailedFilter());
  const config = new DocumentBuilder()
    .setTitle('Scissors')
    .setDescription('The Scissors API description')
    .setVersion('1.0')
    .addTag('links', 'All Links related endpoints')
    .addTag('home', 'All Links related to redirection')
    .build();
  app.set('trust proxy', 1);

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
