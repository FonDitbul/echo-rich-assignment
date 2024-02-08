import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ResponseTransformInterceptor } from './common/response.transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  const config = new DocumentBuilder()
    .setTitle('echo rich assignment api')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
}
bootstrap();
