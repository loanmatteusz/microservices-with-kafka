import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = await this.prisma.author.create({
      data: createAuthorDto,
    });
    return author;
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: string) {
    return `This action returns a #${id} author`;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: string) {
    return `This action removes a #${id} author`;
  }
}
