import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Docs } from './shared/docs';
import { env } from './shared/env';
import { LoggerInterceptor } from './shared/interceptor/logger.interceptor';
import { formatValidationError } from './shared/validators/format-validation-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Docs.initialize(app);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) => {
        return formatValidationError(errors);
      },
      stopAtFirstError: true,
    }),
  );

  app.useGlobalInterceptors(new LoggerInterceptor());
  
  app.enableCors();
  app.setGlobalPrefix(env.API_PREFIX || 'v1');

  await app.listen(3333, '0.0.0.0');
}
bootstrap();
