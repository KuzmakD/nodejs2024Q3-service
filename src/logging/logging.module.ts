import { ConsoleLogger, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingFilter } from './logging.filter';

@Module({
  providers: [
    LoggingService,
    ConsoleLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LoggingFilter,
    },
  ],
  exports: [LoggingService],
})
export class LoggingModule {
  constructor(private logging: LoggingService) {
    process.on('unhandledRejection', () => {
      this.logging.error('Unhandled Rejection:');
    });
    process.on('uncaughtException', (error: Error) => {
      this.logging.error('Uncaught Exception:', error.stack);
    });
  }
}
