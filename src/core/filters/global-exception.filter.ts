import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

const getErrorMessage = <T>(exception: T): any => {
  if (exception instanceof HttpException) {
    return exception['response']['message'] || exception.message;
  } else {
    return String(exception);
  }
};

@Catch()
export class GlobalExceptionFilter<T> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse();

    const statusCode = getStatusCode<T>(exception);
    const message = getErrorMessage<T>(exception);

    return response.code(statusCode).send({
      error: {
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        message: message,
        path: request.url,
      },
    });
  }
}
