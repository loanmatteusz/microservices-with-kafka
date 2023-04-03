import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/user/dto/update-user.dto";
import { User } from "src/modules/user/entities/user.entity";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor (private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password, nickname } = createUserDto;
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password,
                perfil: {
                    create: {
                        nickname,
                    }
                }
            },
            include: {
                perfil: true,
            }
        });
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            include: {
                perfil: true,
            }
        });
        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                perfil: true,
            }
        });
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.prisma.user.update({
            data: {
                updated_at: new Date(),
                ...updateUserDto
            },
            where: { id }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}
