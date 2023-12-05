import { IsNumber, IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
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
  readonly type: string;
}
