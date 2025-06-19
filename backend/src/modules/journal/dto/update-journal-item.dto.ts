import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateJournalItemDto {
  @IsOptional()
  @IsISO8601()
  date?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
