import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductGroup } from '../../product-group/entities/product-group.entity';
import { PriceTemplate } from '../../price-template/entities/price-template.entity';
import { ReceiptItem } from '../../../documents/receipt/entities/receipt-item.entity';
import { WriteOffItem } from '../../../documents/write-off/entities/write-off.item';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column()
  barcode: string;

  @ManyToOne(() => ProductGroup, (productGroup) => productGroup.products)
  group: ProductGroup;

  @ManyToOne(() => PriceTemplate, (priceTemplate) => priceTemplate.products)
  price_template: PriceTemplate;

  @OneToMany(() => ReceiptItem, (receiptItem) => receiptItem.product)
  receipts: ReceiptItem[];

  @OneToMany(() => WriteOffItem, (writeOffItem) => writeOffItem.product)
  writeOffs: WriteOffItem[];
}
