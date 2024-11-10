import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/swagger-config';

config();

const PORT = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);

  await app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`),
  );
}
bootstrap();
