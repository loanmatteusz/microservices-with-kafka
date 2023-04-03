import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9093"],
          },
          consumer: {
            groupId: "my-group-producer",
          }
        }
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository,
    {
      provide: "KAFKA_PRODUCER",
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ["KAFKA_SERVICE"],
    }
  ]
})
export class UserModule { }
