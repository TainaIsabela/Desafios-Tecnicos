import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}
  create(Content: Content) {
    return this.contentRepository.save(Content);
  }

  async findAll() {
    return await this.contentRepository.find();
  }

  async findOne(_id: number) {
    return await this.contentRepository.find({
      select: ['id', 'title', 'year', 'duration', 'link'],
      where: { id: _id },
    });
  }

  async update(id: number, Content: Content) {
    return await this.contentRepository.update(id, {
      title: Content.title,
      year: Content.year,
      duration: Content.duration,
      link: Content.link,
    });
  }

  async remove(id: number) {
    return await this.contentRepository.delete(id);
  }
}
