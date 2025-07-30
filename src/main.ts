import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const yellow = '\x1b[33m';
  const green = '\x1b[32m'; 
  const logger = new Logger();  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','log'],
  });
  const port = process.env.PORT || 3005;
  logger.log(`${yellow}[Info]${green} Server started on port ${port}`);

  await app.listen(port);
}
bootstrap();
