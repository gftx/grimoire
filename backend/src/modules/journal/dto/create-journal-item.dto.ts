import { IsISO8601, IsString } from 'class-validator';

export class CreateJournalItemDto {
  @IsISO8601()
  date!: string;

  @IsString()
  content!: string;
}
