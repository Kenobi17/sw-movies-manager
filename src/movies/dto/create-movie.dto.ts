import { IsInt, IsString, IsArray, IsNotEmpty, IsDateString, IsUrl, ArrayNotEmpty, ArrayUnique, Matches } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  episodeId: number;

  @IsNotEmpty()
  @IsString()
  openingCrawl: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsDateString()
  created: Date;

  @IsNotEmpty()
  @IsDateString()
  edited: Date;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/people\//, { each: true })
  @IsString({ each: true })
  characters: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/planets\//, { each: true })
  @IsString({ each: true })
  planets: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/starships\//, { each: true })
  @IsString({ each: true })
  starships: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/vehicles\//, { each: true })
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/species\//, { each: true })
  @IsString({ each: true })
  species: string[];
}

