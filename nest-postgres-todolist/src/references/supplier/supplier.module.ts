import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), CompanyModule, PersonModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
