import { Song } from '../song';

export abstract class SongRepository {
  abstract findOne(specification: any): Promise<Song>;
  abstract findAll(specification: any): Promise<Song[]>;
  abstract save(song: Song): Promise<void>;
}
