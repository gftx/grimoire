import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IdeaStatus, IdeaType } from '@prisma/client';

export class CreateIdeaDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(IdeaStatus)
  status!: IdeaStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsEnum(IdeaType)
  type!: IdeaType;
}
