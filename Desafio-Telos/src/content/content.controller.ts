import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Content } from './content.entity';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post()
  create(@Body() content: Content) {
    return this.contentService.create(content);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param() Params) {
    return this.contentService.findOne(Params.id);
  }

  @Put(':id')
  update(@Param() params, @Body() content: Content) {
    return this.contentService.update(params.id, content);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.contentService.remove(params.id);
  }
}
