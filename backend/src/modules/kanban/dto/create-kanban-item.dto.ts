import { IsString, IsNumber } from 'class-validator';

export class CreateKanbanItemDto {
  @IsString()
  columnId!: string;

  @IsString()
  ideaId!: string;

  @IsNumber()
  order!: number;
}
