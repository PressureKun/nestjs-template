import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};

const getMongoString = (configService: ConfigService) => {
    const mongoString =
        'mongodb://' +
        configService.get('MONGO_LOGIN') +
        ':' +
        configService.get('MONGO_PASSWORD') +
        '@' +
        configService.get('MONGO_HOST') +
        ':' +
        configService.get('MONGO_PORT') +
        '/?authSource=' +
        configService.get('MONGO_AUTHDATABASE');

    console.log('mongoString');
    console.log(mongoString);
    return mongoString;

    // ${}:${}@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?authSource=admin&replicaSet=myRepl';
};

const getMongoOptions = () => ({
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});
