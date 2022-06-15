import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    // new ParseIntPipe({}),
  );

  const PORT = process.env.PORT || 3000;
  console.log('App running on ' + PORT.toString());

  await app.listen(PORT);
}
bootstrap();
