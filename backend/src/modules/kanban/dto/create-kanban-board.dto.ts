import { IsString, IsOptional } from 'class-validator';

export class CreateKanbanBoardDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
