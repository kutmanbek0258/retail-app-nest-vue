import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Person } from '../../person/entities/person.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Receipt } from '../../../documents/receipt/entities/receipt.entity';
import { WriteOff } from '../../../documents/write-off/entities/write-off.entity';
import { Recount } from '../../../documents/recount/entities/recount.entity';

@Entity()
export class Depot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 200 })
  address: string;

  @ManyToOne(() => Company, (company) => company.depots)
  company: Company;

  @ManyToOne(() => Person, (person) => person.depots)
  manager: Person;

  @OneToMany(() => Shop, (shop) => shop.depot)
  shops: Shop[];

  @OneToMany(() => Receipt, (receipt) => receipt.depot)
  receipts: Receipt[];

  @OneToMany(() => WriteOff, (writeOff) => writeOff.depot)
  writeOffs: WriteOff[];

  @OneToMany(() => Recount, (recount) => recount.depot)
  recounts: Recount[];
}
