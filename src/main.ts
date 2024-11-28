import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/swagger-config';
import { LoggingService } from './logging/logging.service';

config();

const PORT = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  await setupSwagger(app);

  const logger = await app.resolve(LoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      strictGroups: true,
    }),
  );
  await app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`),
  );
}
bootstrap();
