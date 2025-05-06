import { IsString, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  ideaId!: string;

  @IsDateString()
  date!: string; // ISO-строка даты, например: '2025-05-01'
}
