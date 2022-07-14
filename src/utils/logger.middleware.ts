import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware/nest-middleware.interface';
import { Logger } from '@nestjs/common/services/logger.service';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('HTTP');

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', async () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      await this.prisma.logger.create({
        data: {
          originalUrl: originalUrl,
          statusCode: statusCode.toString(),
          userAgent: userAgent,
          ip: ip,
          date: new Date(),
        },
      });
      if (method !== 'GET') {
        this.logger.error(request.body);
      }
    });

    next();
  }
}
