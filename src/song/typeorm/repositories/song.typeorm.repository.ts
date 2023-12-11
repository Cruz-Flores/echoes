import { SongRepository } from 'src/song/interfaces/song.repository';
import { Song } from 'src/song/song';

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
  findOne(specification: any): Promise<Song> {
    throw new Error('Method not implemented.');
  }

  findAll(specification: any): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }

  save(song: Song): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
