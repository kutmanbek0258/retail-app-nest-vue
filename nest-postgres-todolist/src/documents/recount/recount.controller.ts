import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecountService } from './recount.service';
import { CreateRecountDto } from './dto/create-recount.dto';
import { UpdateRecountDto } from './dto/update-recount.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AddRecountItemDto } from './dto/add-recount-item.dto';
import { UpdateRecountItemDto } from './dto/update-recount-item.dto';

@Controller('recount')
export class RecountController {
  constructor(private readonly recountService: RecountService) {}

  @Post()
  create(@Body() createRecountDto: CreateRecountDto) {
    return this.recountService.create(createRecountDto);
  }

  @Post('get-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.recountService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecountDto: UpdateRecountDto) {
    return this.recountService.update(+id, updateRecountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recountService.remove(+id);
  }

  @Post('addItem')
  addItem(@Body() addItemDto: AddRecountItemDto) {
    return this.recountService.addItem(addItemDto);
  }

  @Get('get-all-items/:id')
  getAllItems(@Param('id') recountId: number) {
    return this.recountService.getAllItems(recountId);
  }

  @Patch('update-item/:id')
  updateItem(
    @Param('id') itemId: number,
    @Body() updateRecountItemDto: UpdateRecountItemDto,
  ) {
    return this.recountService.updateItem(itemId, updateRecountItemDto);
  }

  @Delete('delete-item/:id')
  deleteItem(@Param('id') itemId: number) {
    return this.recountService.deleteItem(itemId);
  }
}