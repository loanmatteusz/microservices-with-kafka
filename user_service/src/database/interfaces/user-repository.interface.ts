import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/user/dto/update-user.dto";
import { User } from "src/modules/user/entities/user.entity";

export interface UserRepositoryInterface {
    create: (createUserDto: CreateUserDto) => Promise<User>
    findAll: () => Promise<User[]>
    findById: (id: string) => Promise<User>
    update: (id: string, updateUserDto: UpdateUserDto) => Promise<void>
    delete: (id: string) => Promise<void>
}
