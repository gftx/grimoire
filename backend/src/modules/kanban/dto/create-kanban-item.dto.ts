import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateKanbanItemDto {
  @IsString()
  columnId!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNumber()
  order!: number;
}
