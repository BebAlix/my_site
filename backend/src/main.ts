import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    // [
    //   'http://127.0.0.1:5173',
    //   'http://localhost:5173',
    //   'http://localhost:80',
    // ],
    // methods: ['GET', 'PUT', 'POST', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeader: ['Content-Range', 'X-Total-Count'],
    // maxAge: 600,
    // PreflightContinue: false,
    // optionSuccessStatus: 204,
    // credentials: true,
  });
  // const { doubleCsrfProtection } = doubleCsrf({
  //   cookieOptions: {
  //     secure: process.env.NODE_ENV === 'production',
  //     httpOnly: true,
  //     sameSite: 'strict',
  //     maxAge: 60 * 60 * 24 * 30,
  //   },
  //   getSecret: () => process.env.CSRF_SECRET as string,
  //   getSessionIdentifier: (req: any) => req.sessionID as string,
  // });
  // app.use(doubleCsrfProtection);
  // app.use(helmet());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
