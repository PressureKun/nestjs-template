import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const testProductId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Тест1',
    title: 'Заголовок',
    description: 'Тестовое описание',
    rating: 5,
    productId: testProductId,
};

const testDtoFail: CreateReviewDto = {
    name: '',
    title: 'Заголовок',
    description: 'Тестовое описание',
    rating: 7,
    productId: testProductId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    const createTestFunction = async (): Promise<void> => {
        const { body }: request.Response = await request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201);

        createdId = body._id;
        expect(createdId).toBeDefined();
    };

    const createTestFunctionFail = () => {
        return request(app.getHttpServer()).post('/review/create').send(testDtoFail).expect(400);
    };

    const deleteTestFunction = () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    };

    const findTestFunction = async () => {
        console.log('testProductId ' + testProductId);
        return request(app.getHttpServer())
            .get('/review/byProduct/' + testProductId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
            });
    };

    it('/review/create - success (POST)', createTestFunction);

    it('/review/create - fail (POST)', createTestFunctionFail);

    it('/review/byProduct/:productId (GET)', findTestFunction);

    it('/review/delete:id (DELETE)', deleteTestFunction);

    afterAll(() => {
        disconnect();
    });
});
