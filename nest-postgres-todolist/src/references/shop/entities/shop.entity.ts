import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Person } from '../../person/entities/person.entity';
import { Pos } from '../../pos/entities/pos.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';
import { Depot } from '../../depot/entities/depot.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 120,
  })
  name: string;

  @Column({
    length: 500,
  })
  description: string;

  @Column({
    length: 120,
  })
  address: string;

  @ManyToOne(() => Company, (company) => company.shops)
  company: Company;

  @ManyToOne(() => Person, (person) => person.shops)
  manager: Person;

  @ManyToOne(() => Depot, (depot) => depot.shops)
  depot: Depot;

  @OneToMany(() => Pos, (pos) => pos.shop)
  poses: Pos[];

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.shop)
  cashRegisters: CashRegister[];
}