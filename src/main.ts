import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
  });

  const config = new DocumentBuilder()
    .setTitle('Oracle HR Example')
    .setDescription('The HR API description')
    .setVersion('1.0')
    .addTag('HR')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableShutdownHooks();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
