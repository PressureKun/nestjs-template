import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerBaseConfig = new DocumentBuilder()
    .setTitle('Nest template API')
    .setDescription('education purposes')
    .setVersion('1.0')
    .addTag('test')
    .build();

const swaggerUiConfig = {
    useGlobalPrefix: false,
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, swaggerBaseConfig);
    SwaggerModule.setup('api', app, document, swaggerUiConfig);

    await app.listen(8000);
}

bootstrap();
