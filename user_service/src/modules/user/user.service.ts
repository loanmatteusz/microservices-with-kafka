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

  async findAll() {
    const users = await this.userRepository.findAll();
    const usersWIthoutPassword = users.map(user => {
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
        updated_at
      }
    });
    return usersWIthoutPassword;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new HttpException(`The id ${id} is not found or doesn't exists`, HttpStatus.NOT_FOUND);
    const { id: user_id, name, email, created_at, updated_at, perfil } = user;
    const { id: perfil_id, nickname } = perfil;
    return {
      id: user_id,
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new HttpException(`The id ${id} is not found or doesn't exists`, HttpStatus.NOT_FOUND);
    return await this.userRepository.delete(id);
  }
}
