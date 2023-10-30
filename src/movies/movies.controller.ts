import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Response } from 'src/common/types/response.type';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) { }

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getMovies(): Promise<Response<Movie[]>> {
    const movies = await this.moviesService.getMovies()

    if (!movies) throw new InternalServerErrorException('Error fetching movies')

    return {
      statusCode: HttpStatus.OK,
      message: 'Movies fetched successfuly',
      body: movies
    }
  }


  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMovieById(@Param('id') id: string): Promise<Response<Movie>> {
    const movie = await this.moviesService.getMovieById(parseInt(id))

    if (!movie) throw new NotFoundException(`Movie with id ${id} does not exist`)

    return {
      statusCode: HttpStatus.OK,
      message: `Fetched movie with id ${id} successfuly`,
      body: movie
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNewMovie(@Body() data: CreateMovieDto): Promise<Response<Movie>> {
    const movie = await this.moviesService.creatNewMovie(data)

    return {
      statusCode: HttpStatus.OK,
      message: `Created new movie successfuly`,
      body: movie
    }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateMovie(@Param('id') id: string, @Body() data: UpdateMovieDto): Promise<Response<Movie>> {
    const movie = await this.moviesService.updateMovie(parseInt(id), data)

    return {
      statusCode: HttpStatus.OK,
      message: `Updated movie successfuly`,
      body: movie
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteMovie(@Param('id') id: string): Promise<Response<null>> {
    await this.moviesService.deleteMovie(parseInt(id))

    return {
      statusCode: HttpStatus.OK,
      message: `Deleted movie successfuly`,
      body: null
    }
  }
}
