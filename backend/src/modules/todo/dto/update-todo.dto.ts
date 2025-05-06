import { IsOptional, IsDateString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
