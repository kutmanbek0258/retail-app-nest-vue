import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindAllDto {
  @IsNotEmpty()
  @IsNumber()
  skip: number;

  @IsNotEmpty()
  @IsNumber()
  take: number;
}
