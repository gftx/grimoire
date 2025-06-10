import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsDateString()
  date!: string;
}
