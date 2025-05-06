import { IsString, IsOptional } from 'class-validator';

export class UpdateKanbanBoardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
