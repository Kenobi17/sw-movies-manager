import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/register')
  register(@Body() data: RegisterDto): Promise<Tokens> {
    this.authService.register(data)
  }

  @Post('/login')
  login() {
    this.authService.login()
  }

  @Post('/logout')
  logout() {
    this.authService.logout()
  }

  @Post('/refresh')
  refresh() {
    this.authService.refresh()
  }

}
