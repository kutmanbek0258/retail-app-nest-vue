import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { SupplierService } from '../../references/supplier/supplier.service';
import { ShopService } from '../../references/shop/shop.service';
import { DepotService } from '../../references/depot/depot.service';
import { Supplier } from '../../references/supplier/entities/supplier.entity';
import { Shop } from '../../references/shop/entities/shop.entity';
import { Depot } from '../../references/depot/entities/depot.entity';
import { FindAllDto } from './dto/find-all.dto';
import { User } from '../../user/entities/user.entity';
import { ReceiptItem } from './entities/receipt-item.entity';
import { AddReceiptItemDto } from './dto/add-receipt-item.dto';
import { ProductService } from '../../references/product/product.service';
import { UpdateReceiptItemDto } from './dto/update-receipt-item.dto';
import { Product } from '../../references/product/entities/product.entity';
import { SorterDto } from './dto/sorter.dto';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    @InjectRepository(ReceiptItem)
    private readonly receiptItemRepository: Repository<ReceiptItem>,
    private readonly supplierService: SupplierService,
    private readonly shopService: ShopService,
    private readonly depotService: DepotService,
    private readonly productService: ProductService,
  ) {}
  async create(user: User, createReceiptDto: CreateReceiptDto) {
    const supplier: Supplier = await this.supplierService.findOneShort(
      createReceiptDto.supplierID,
    );
    const shop: Shop = await this.shopService.findOneShort(
      createReceiptDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      createReceiptDto.depotID,
    );
    if (supplier && shop && depot) {
      const receipt = this.receiptRepository.create({
        supplier,
        shop,
        depot,
        created_by: user,
      });
      return await this.receiptRepository.manager.save(receipt);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(findAllDto: FindAllDto) {
    const total = await this.receiptRepository.count();
    const receipts = await this.receiptRepository.query(
      `SELECT receipt.id AS id, receipt."supplierId" AS supplierID, receipt."shopId" AS shopid, receipt."depotId" AS depotid, receipt.created_at,
                    p.full_name AS suppliername,
                    s.name AS shopname,
                    d.name AS depotname
                FROM receipt
                INNER JOIN supplier sr on sr.id = receipt."supplierId"
                INNER JOIN shop s on s.id = receipt."shopId"
                INNER JOIN depot d on d.id = receipt."depotId"
                INNER JOIN person p on p.id = sr."personId"
                LIMIT $1 OFFSET $2`,
      [findAllDto.take, findAllDto.skip],
    );
    return { total, receipts };
  }

  async findOne(id: number) {
    return await this.receiptRepository.query(
      `SELECT receipt.id AS id, receipt."supplierId" AS supplierID, receipt."shopId" AS shopid, receipt."depotId" AS depotid,
                    p.full_name AS suppliername,
                    s.name AS shopname,
                    d.name AS depotname
                FROM receipt
                INNER JOIN supplier sr on sr.id = receipt."supplierId"
                INNER JOIN shop s on s.id = receipt."shopId"
                INNER JOIN depot d on d.id = receipt."depotId"
                INNER JOIN person p on p.id = sr."personId"
                WHERE receipt.id = $1`,
      [id],
    );
  }

  async findOneShort(id: number) {
    return await this.receiptRepository.findOneBy({ id: id });
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const supplier: Supplier = await this.supplierService.findOneShort(
      updateReceiptDto.supplierID,
    );
    const shop: Shop = await this.shopService.findOneShort(
      updateReceiptDto.shopID,
    );
    const depot: Depot = await this.depotService.findOneShort(
      updateReceiptDto.depotID,
    );
    if (supplier && shop && depot) {
      return await this.receiptRepository.update(
        { id: id },
        {
          supplier,
          shop,
          depot,
        },
      );
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number) {
    return await this.receiptRepository.delete({ id: id });
  }

  async createAndFillPriceFromReceipt(receiptID: number, user: User) {
    const priceID = await this.receiptRepository.query(
      `SELECT * FROM create_and_fill_price_document_from_receipt($1, $2);`,
      [receiptID, user.id],
    );
    return { priceID: priceID[0].create_and_fill_price_document_from_receipt };
  }

  async addItem(addReceiptItemDto: AddReceiptItemDto) {
    const product = await this.productService.findOneShort(
      addReceiptItemDto.productID,
    );
    const receipt = await this.findOneShort(addReceiptItemDto.receiptID);
    if (product && receipt) {
      const receiptItem = this.receiptItemRepository.create({
        receipt,
        product,
        quantity: addReceiptItemDto.quantity,
        price: addReceiptItemDto.price,
      });
      return await this.receiptItemRepository
        .save(receiptItem)
        .catch((error) => {
          throw new ForbiddenException({ message: error.message });
        });
    } else {
      throw new ForbiddenException();
    }
  }

  async getAllItems(receiptId: number, sorterDto: SorterDto) {
    const order = sorterDto.order === 'ascend' ? 'ASC' : 'DESC';
    return await this.receiptItemRepository.query(
      `SELECT ri.id, ri.quantity, ri.price,
                       ri."productId" AS productid,
                       p.name AS productname
                FROM receipt_item ri
                INNER JOIN product p on p.id = ri."productId"
                WHERE ri."receiptId" = $1
                ORDER BY ri.id DESC;`,
      [receiptId],
    );
  }

  async updateItem(itemId: number, updateReceiptItemDto: UpdateReceiptItemDto) {
    const product: Product = await this.productService.findOneShort(
      updateReceiptItemDto.productID,
    );
    if (product) {
      return await this.receiptItemRepository
        .update(
          { id: itemId },
          {
            product: product,
            quantity: updateReceiptItemDto.quantity,
            price: updateReceiptItemDto.price,
          },
        )
        .catch((error) => {
          throw new ForbiddenException({ message: error.message });
        });
    } else {
      throw new ForbiddenException();
    }
  }

  async deleteItem(itemId: number) {
    return await this.receiptItemRepository
      .delete({ id: itemId })
      .catch((error) => {
        throw new ForbiddenException({ message: error.message });
      });
  }
}
