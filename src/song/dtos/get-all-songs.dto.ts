import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

//podrian solicitarse los filtros que uno crea necesarios y parsearlos para la tecnologia que se este usando
export class GetAllSongsDTO {
  @IsOptional()
  @IsString()
  filterBy?: string;

  @IsOptional()
  @IsString()
  filterValue?: string;

  @IsOptional()
  @IsString()
  filterType?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  per_page?: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(OrderType)
  orderType?: OrderType;
}
