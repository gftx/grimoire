import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateKanbanColumnDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
