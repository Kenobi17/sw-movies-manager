import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) { }

  async register(data: RegisterDto): Promise<Tokens> {
    try {
      const newUser = await this.userService.createUser(data)

      const { id, email } = newUser

      const tokens = await this.getTokens(id, email)

      await this.userService.updateRefreshToken(id, tokens.refresh_token)

      return tokens
    } catch (e) {
      throw new InternalServerErrorException(`Error in register: ${e.message}`)
    }
  }

  async login(data: LoginDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(data.email)

    if (!user) throw new ForbiddenException("Access Denied")

    const passwordMatches = await bcrypt.compare(data.password, user.password)
    if (!passwordMatches) throw new ForbiddenException("Access Denied")

    const { id, email } = user

    const tokens = await this.getTokens(id, email)
    await this.userService.updateRefreshToken(id, tokens.refresh_token)

    return tokens
  }

  async logout(userId: number) {
    try {
      await this.userService.deleteRefreshToken(userId)
    } catch (e) {
      throw new InternalServerErrorException(`Error in logout ${e.message}`)
    }
  }

  async refresh(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findById(userId)

    if (!user || !user.hashedRT) throw new ForbiddenException("Access Denied")

    const rtMatches = bcrypt.compare(refreshToken, user.hashedRT)
    if (!rtMatches) throw new ForbiddenException("Access Denied")

    const { id, email } = user

    const tokens = await this.getTokens(id, email)
    await this.userService.updateRefreshToken(id, tokens.refresh_token)

    return tokens
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email
      },
        {
          secret: 'access-secret',
          expiresIn: 60 * 15,
        }
      ),

      this.jwtService.signAsync({
        sub: userId,
        email
      },
        {
          secret: 'refresh-secret',
          expiresIn: 60 * 60 * 24 * 7,
        }
      )
    ])

    return {
      access_token,
      refresh_token
    }
  }
}
