import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }



  async register(data: RegisterDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword
      }
    })

    const { id, email } = newUser

    const tokens = await this.getTokens(id, email)
    await this.updateRefreshToken(id, tokens.refresh_token)

    return tokens
  }

  async login(data: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!user) throw new ForbiddenException("Access Denied")

    const passwordMatches = await bcrypt.compare(data.password, user.password)
    if (!passwordMatches) throw new ForbiddenException("Access Denied")

    const { id, email } = user

    const tokens = await this.getTokens(id, email)
    await this.updateRefreshToken(id, tokens.refresh_token)

    return tokens
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRT: {
          not: null,
        }
      },
      data: {
        hashedRT: null
      }
    })
  }

  async refresh(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user || !user.hashedRT) throw new ForbiddenException("Access Denied")

    const rtMatches = bcrypt.compare(refreshToken, user.hashedRT)
    if (!rtMatches) throw new ForbiddenException("Access Denied")

    const { id, email } = user

    const tokens = await this.getTokens(id, email)
    await this.updateRefreshToken(id, tokens.refresh_token)

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

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10)
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hashedRT: hashedToken
      }
    })
  }
}
