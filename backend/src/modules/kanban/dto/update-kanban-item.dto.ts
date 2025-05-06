import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateKanbanItemDto {
  @IsOptional()
  @IsString()
  columnId?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
