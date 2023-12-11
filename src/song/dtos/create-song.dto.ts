import {
  IsNumber,
  IsUUID,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Version } from '@echoes/core';

export class CreateSongDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly level: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perceivedLevel: number;

  @IsEnum(Version)
  @IsNotEmpty()
  readonly version: Version;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
