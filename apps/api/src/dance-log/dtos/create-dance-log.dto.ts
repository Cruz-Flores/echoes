import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateDanceLogDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly id!: string;

  @IsUUID()
  @IsNotEmpty()
  readonly songId!: string;

  @IsUUID()
  @IsNotEmpty()
  readonly sessionId!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly kcal!: number;

  @IsBoolean()
  @IsOptional()
  readonly wasOmitted?: boolean;

  @IsDateString()
  @IsNotEmpty()
  readonly dancedAt!: string;
}
