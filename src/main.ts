import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Финальный проект по Angular')
    .setDescription('Создание и чтение из базы данных Firebase')
    .setVersion('1.0')
    .addTag('firebase')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}
bootstrap().then(() => {
  console.info(`Server is running on port 3000`);
});
