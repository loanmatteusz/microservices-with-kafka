import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthorService } from './author.service';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) { }

  @MessagePattern('create_user')
  async consumer(@Payload() message: KafkaMessage) {
    console.info({
      consumer: message,
    });
    
    const { id, name, nickname } = message as any;
    await this.authorService.create({
      id,
      name,
      nickname,
    });
  }
}
