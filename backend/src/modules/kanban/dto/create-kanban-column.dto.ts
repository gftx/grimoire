import { IsString, IsNumber } from 'class-validator';

export class CreateKanbanColumnDto {
  @IsString()
  boardId!: string;

  @IsString()
  title!: string;

  @IsNumber()
  order!: number;
}
