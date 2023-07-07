import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://ecommerce-v2-three.vercel.app",
    credentials: true,
    methods: ["GET", "POST"]
  });
  await app.listen(3000);
}
bootstrap();
