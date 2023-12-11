import { SongRepository } from 'src/song/interfaces/song.repository';
import { Song } from 'src/song/song';
import { Repository } from 'typeorm';
import { SongEntity } from '../entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';

export type GetAllSongsParams = {
  filterBy?: string;
  filterValue?: string;
  filterType?: string;
  page?: number;
  per_page?: number;
  orderBy?: string;
  orderType?: string;
};

export class SongTypeormRepository implements SongRepository {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
  ) {}

  findOne(specification: any): Promise<Song> {
    throw new Error('Method not implemented.');
  }

  findAll(specification: any): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }

  async save(song: Song): Promise<void> {
    const songEntity = this.repository.create({
      id: song.getId(),
      level: song.getLevel(),
      perceivedLevel: song.getPerceivedLevel(),
      version: song.getVersion(),
      name: song.getName(),
    });
    await this.repository.save(songEntity);

    return void 0;
  }
}
