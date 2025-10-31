import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sanitizeUser } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const name = createUserDto.name || email.split('@')[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return sanitizeUser(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    const safeUsers = users.map((user) => {
      return sanitizeUser(user);
    });
    return safeUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');

    return sanitizeUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return sanitizeUser(user);
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return {
      message: 'User deleted successfully',
      user: sanitizeUser(deletedUser),
    };
  }
}
