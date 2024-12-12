import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS
  app.enableCors({
    origin: ['http://192.168.1.6:8081', 'http://localhost:8081'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
