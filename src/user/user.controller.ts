import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('/login')
  login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { jwt, user } = await this.userService.getJwtAndUser(dto);

        response.cookie('jwt', jwt, { httpOnly: true });

        resolve({ id: user._id || '', username: user.username });
      } catch (error) {
        reject(error);
      }
    });
  }

  @Get()
  async getUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findUserById(data.id);

      return { id: user._id, username: user.username };
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
