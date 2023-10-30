import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })

  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async createUser(data: RegisterDto) {
    const { email, password } = data

    const foundUser = await this.findByEmail(email)

    if (foundUser) throw new ConflictException(`There is already an user registered with email ${email}`)

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    return newUser
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

  async deleteRefreshToken(userId: number) {
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
}
