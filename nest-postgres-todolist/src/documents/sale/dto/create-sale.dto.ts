import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  shiftID: number;

  @IsNotEmpty()
  @IsNumber()
  posID: number;

  @IsNotEmpty()
  @IsNumber()
  salesmanID: number;
}
