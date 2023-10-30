import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilmsResponse } from './types/swapi-films-response.type';
import { firstValueFrom } from 'rxjs';
import { Film } from './types/film.type';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private httpService: HttpService
  ) { }

  SW_API = this.configService.get<string>('SWAPI_URL')

  async onModuleInit() {
    this.initMoviesData()
  }

  async getSWAPIFilms(): Promise<FilmsResponse> {
    try {

      const resObservable = this.httpService.get(`${this.SW_API}films`)

      const res = await firstValueFrom(resObservable)

      return res.data
    } catch (e) {
      throw new Error(`Error fetching movies from star wars api: ${e.message}`)
    }
  }

  async getMovies() {
    const movies = await this.prismaService.movie.findMany()
    return movies
  }

  async getMovieById(id: number) {
    const movie = await this.prismaService.movie.findUnique({
      where: { id }
    })

    return movie
  }

  async creatNewMovie(data: CreateMovieDto) {
    try {
      const { episodeId } = data

      const foundMovie = await this.prismaService.movie.findUnique({ where: { episodeId } })

      if (foundMovie) throw new Error(`There is already a movie with episode id ${episodeId}`)

      const newMovie = await this.prismaService.movie.create({ data })

      return newMovie
    } catch (e) {
      throw new InternalServerErrorException(`Error creating new movie: ${e.message}`)
    }
  }

  async updateMovie(movieId: number, updateData: UpdateMovieDto) {
    try {
      const foundMovie = await this.prismaService.movie.findUnique({ where: { id: movieId } });

      if (!foundMovie) throw new Error(`No movie found with id ${movieId}`);

      const updatedMovie = await this.prismaService.movie.update({
        where: { id: movieId },
        data: updateData,
      });

      return updatedMovie;
    } catch (e) {
      throw new InternalServerErrorException(`Error updating the movie: ${e.message}`);
    }
  }

  async deleteMovie(movieId: number) {
    try {
      const foundMovie = await this.prismaService.movie.findUnique({ where: { id: movieId } });

      if (!foundMovie) throw new Error(`No movie found with id ${movieId}`);

      await this.prismaService.movie.delete({
        where: { id: movieId },
      });

    } catch (e) {
      throw new InternalServerErrorException(`Error deleting the movie: ${e.message}`);
    }
  }


  async upsertFilm(film: Film) {
    const {
      title,
      episode_id,
      opening_crawl,
      director,
      producer,
      release_date,
      created,
      edited,
      url,
      characters,
      planets,
      starships,
      vehicles,
      species
    } = film;

    await this.prismaService.movie.upsert({
      where: { episodeId: film.episode_id },
      update: {},
      create: {
        title,
        episodeId: episode_id,
        openingCrawl: opening_crawl,
        director,
        producer,
        releaseDate: new Date(release_date).toISOString(),
        created,
        edited,
        url,
        characters,
        planets,
        starships,
        vehicles,
        species
      }
    })
  }

  // for lack of time and context this was the fastest approach to handle movie data coming from 
  // the star wars api. TODO: figure out a better way to handle the movies that are in the api
  async initMoviesData() {
    try {
      const res = await this.getSWAPIFilms()
      const films = res.results

      const promises = films.map(film => this.upsertFilm(film))
      await Promise.all(promises)

    } catch (e) {
      console.error("Error initializing movies data:", e.message)
    }
  }

}
