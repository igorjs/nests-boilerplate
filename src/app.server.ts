import compression from '@fastify/compress';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

// Filters
import { PrismaClientExceptionFilter } from 'src/core/filters/prisma-exception.filter';

// Modules
import { GlobalExceptionFilter } from 'src/core/filters/global-exception.filter';
import { AppModule } from './app.module';

export async function configureServer(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Setting API Path
  app.setGlobalPrefix('api');

  // Enable Service configs
  app.enableCors();
  app.enableVersioning();

  // Enable Filters, Guards, and Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(
    new GlobalExceptionFilter(httpAdapter),
    new PrismaClientExceptionFilter(httpAdapter),
  );

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate API')
    .setDescription('Manage schedules and tasks')
    .setVersion('1.0')
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, documentOptions);

  SwaggerModule.setup('api-docs', app, document);

  // Register other middlewares
  await app.register(compression);

  return app;
}
