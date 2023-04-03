import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["localhost:9093"]
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      }
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
