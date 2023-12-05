import { Version } from '@echoes/core';
import {
  IsNumber,
  IsString,
  IsUUID,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateSongDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly level: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perceivedLevel: number;

  @IsEnum(Version)
  @IsNotEmpty()
  readonly type: string;
}
