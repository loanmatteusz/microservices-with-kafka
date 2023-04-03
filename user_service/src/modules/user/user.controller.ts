import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParams } from './validators/find-one-params';
import { Producer } from 'kafkajs';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    console.info({
      producer: {
        id: user.id,
        name: user.name,
        nickname: user.perfil.nickname
      }
    });

    await this.kafkaProducer.send({
      topic: 'create_user',
      messages: [{
        key: 'create_user',
        value: JSON.stringify({
          id: user.id,
          name: user.name,
          nickname: user.perfil.nickname
        }),
      }],
    });

    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    const user = this.userService.findOne(params.id);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
