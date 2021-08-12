import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const checkUser = await this.userModel.findOne({ username: dto.username });

    if (checkUser) {
      throw new BadRequestException('A user with the same name already exists');
    }

    const hashPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
    });

    return user;
  }

  async getJwtAndUser(
    dto: LoginUserDto,
  ): Promise<{ jwt: string; user: UserDocument }> {
    const user = await this.userModel.findOne({ username: dto.username });

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid username or password');
    }

    const jwt = await this.jwtService.signAsync({
      id: user._id,
    });

    return { jwt, user };
  }

  async findUserById(id) {
    const user = await this.userModel.findById(id);

    return user;
  }
}
