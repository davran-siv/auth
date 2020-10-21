import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  initSwagger(app);
  await app.listen(process.env.PORT || 5000);
}

const initSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('Auth API documentation')
  .setVersion(`${process.env.npm_package_version}`)
  .setBasePath('v1')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/_swagger', app, document);
};

bootstrap();
