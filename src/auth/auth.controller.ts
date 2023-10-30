import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { GetLoggedUser } from 'src/common/decorators/get-logged-user.decorator';
import { Response } from 'src/common/types/response.type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterDto): Promise<Response<Tokens>> {
    const tokens = await this.authService.register(data)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User register successfuly',
      body: tokens
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto): Promise<Response<Tokens>> {
    const tokens = await this.authService.login(data)

    return {
      statusCode: HttpStatus.OK,
      message: 'User login successfuly',
      body: tokens
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetLoggedUser('sub') userId: number): Promise<Response<null>> {
    await this.authService.logout(userId)

    return {
      statusCode: HttpStatus.OK,
      message: 'User logout successfuly',
      body: null
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetLoggedUser('sub') userId: number,
    @GetLoggedUser('refreshToken') rt: string
  ): Promise<Response<Tokens>> {
    const tokens = await this.authService.refresh(userId, rt)

    return {
      statusCode: HttpStatus.OK,
      message: 'User new access token obtained successfuly',
      body: tokens
    }
  }

}
