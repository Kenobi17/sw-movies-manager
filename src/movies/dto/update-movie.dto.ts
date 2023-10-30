import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  IsDateString,
  IsUrl,
  Matches
} from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  episodeId?: number;

  @IsOptional()
  @IsString()
  openingCrawl?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @IsOptional()
  @IsDateString()
  created?: Date;

  @IsOptional()
  @IsDateString()
  edited?: Date;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/people\//, { each: true })
  @IsString({ each: true })
  characters?: string[];

  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/planets\//, { each: true })
  @IsString({ each: true })
  planets?: string[];

  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/starships\//, { each: true })
  @IsString({ each: true })
  starships?: string[];

  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/vehicles\//, { each: true })
  @IsString({ each: true })
  vehicles?: string[];

  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/swapi\.py4e\.com\/api\/species\//, { each: true })
  @IsString({ each: true })
  species?: string[];
}

