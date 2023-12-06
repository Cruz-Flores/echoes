import { IsNumber, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateDanceLogDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsUUID()
  @IsNotEmpty()
  readonly songId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly kcal: number;

  @IsNumber()
  @IsNotEmpty()
  readonly session: number;
}
