import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { IsUniqueConstraint } from './utils/unique-type-validator';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy, IsUniqueConstraint],
})
export class AppModule {}
