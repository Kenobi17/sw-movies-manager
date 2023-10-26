import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService
  ) { }

  async register(data: RegisterDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword
      }
    })
  }

  login() { }

  logout() { }

  refresh() { }
}
