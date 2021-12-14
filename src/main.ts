import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app= await NestFactory.create<NestExpressApplication> (AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    }
  });

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setViewEngine('html');

  setupSwagger(app);

  await app.listen(3000); 
}
bootstrap();