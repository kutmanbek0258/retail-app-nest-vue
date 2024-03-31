import { Module } from '@nestjs/common';
import { ReceiptModule } from './receipt/receipt.module';
import { WriteOffModule } from './write-off/write-off.module';
import { RecountModule } from './recount/recount.module';
import { PriceModule } from './price/price.module';
import { ShiftModule } from './shift/shift.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ReceiptModule,
    WriteOffModule,
    RecountModule,
    PriceModule,
    ShiftModule,
    SaleModule,
  ],
})
export class DocumentModule {}
