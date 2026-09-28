import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDanceSessionDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  readonly targetSongsCount: number;
}
