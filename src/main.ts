import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "https://ecommerce-v2-three.vercel.app",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true
  });
  await app.listen(3000);
}
bootstrap();
