import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
