import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'warn', 'log'],
  //   cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
  // });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
