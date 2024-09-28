import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

// TODO: Map all necessary types
// @see https://www.prisma.io/docs/orm/reference/error-reference#error-codes

const PrismaErrorMap: Record<string, { status: number; message: string }> = {
  P2000: { status: HttpStatus.BAD_REQUEST, message: 'input data is too long' },
  P2001: { status: HttpStatus.NOT_FOUND, message: 'record does not exist' },
  P2002: { status: HttpStatus.CONFLICT, message: 'reference already exists' },
  P2003: {
    status: HttpStatus.CONFLICT,
    message: 'foreign key constraint failed',
  },
  P2025: { status: HttpStatus.NOT_FOUND, message: 'record does not exist' },
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse();

    const errorCode = exception.code;
    const errorMapping = PrismaErrorMap[errorCode];

    if (errorMapping) {
      const { status: statusCode, message } = errorMapping;

      return response.code(statusCode).send({
        error: {
          statusCode: statusCode,
          timestamp: new Date().toISOString(),
          errorCode: errorCode,
          message: `Query error (${message})`,
          path: request.url,
        },
      });
    } else {
      Logger.error(
        'Uncaught Prisma Client Error -> code:',
        exception.code,
        exception.message,
      );
      return super.catch(exception, host);
    }
  }
}
