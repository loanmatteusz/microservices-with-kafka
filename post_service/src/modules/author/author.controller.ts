import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) { }

  @MessagePattern('createAuthor')
  create(@Payload() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @MessagePattern('findAllAuthor')
  findAll() {
    return this.authorService.findAll();
  }

  @MessagePattern('findOneAuthor')
  findOne(@Payload() id: string) {
    return this.authorService.findOne(id);
  }

  @MessagePattern('updateAuthor')
  update(@Payload() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(updateAuthorDto.id, updateAuthorDto);
  }

  @MessagePattern('removeAuthor')
  remove(@Payload() id: string) {
    return this.authorService.remove(id);
  }

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
