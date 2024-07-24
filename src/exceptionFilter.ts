import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(400).json({
      message: this.handleQueryError(exception.message, request.url),
    });
  }

  private handleQueryError(message: string, path: string) {
    if (message.includes('duplicate') && path.includes('register')) {
      return 'User already exists';
    }
    return message;
  }
}
