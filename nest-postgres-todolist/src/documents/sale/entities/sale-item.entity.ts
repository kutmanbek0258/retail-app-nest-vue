import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../references/product/entities/product.entity';
import { Sale } from './sale.entity';
import { Shift } from '../../shift/entities/shift.entity';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift, (shift) => shift.saleItems)
  shift: Shift;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.receipts)
  product: Product;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @Column({ nullable: false, default: 0 })
  price: number;
}
