import { IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateDanceSessionDTO {
  @IsDateString()
  @IsNotEmpty()
  readonly endedAt!: string;
}
