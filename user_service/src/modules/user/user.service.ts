import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const { id, name, email, created_at, updated_at, perfil } = user;
    const { id: perfil_id, nickname } = perfil;
    return {
      id,
      name,
      email,
      perfil: {
        id: perfil_id,
        nickname,
      },
      created_at,
      updated_at,
    };
  }
}
