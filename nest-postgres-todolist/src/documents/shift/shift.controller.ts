import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { FindAllDto } from './dto/find-all.dto';
import { OpenShiftDto } from './dto/open-shift.dto';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post('open')
  open(@Body() openShiftDto: OpenShiftDto) {
    return this.shiftService.open(openShiftDto);
  }

  close(@Param('id') id: string) {
    return this.shiftService.close(+id);
  }

  @Post('find-all')
  findAll(@Body() findAllDto: FindAllDto) {
    return this.shiftService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftService.remove(+id);
  }
}
