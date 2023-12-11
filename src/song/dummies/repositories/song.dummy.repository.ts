import { Version } from '@echoes/core';

import { Song } from '../../song';
import { SongRepository } from '../../interfaces/song.repository';

export class SongDummyRepository implements SongRepository {
  findOne(specification: any): Promise<Song> {
    throw new Error('Method not implemented.');
  }

  async findAll(specification: any): Promise<Song[]> {
    return [
      Song.of({
        id: '1',
        level: 1,
        perceivedLevel: 1,
        version: Version.ExceedToZero,
        name: 'Song 1',
      }),
      Song.of({
        id: '2',
        level: 2,
        perceivedLevel: 2,
        version: Version.ExceedToZero,
        name: 'Song 2',
      }),
      Song.of({
        id: '3',
        level: 3,
        perceivedLevel: 3,
        version: Version.ExceedToZero,
        name: 'Song 3',
      }),
      Song.of({
        id: '4',
        level: 4,
        perceivedLevel: 4,
        version: Version.ExceedToZero,
        name: 'Song 4',
      }),
      Song.of({
        id: '5',
        level: 5,
        perceivedLevel: 5,
        version: Version.ExceedToZero,
        name: 'Song 5',
      }),
    ];
  }

  save(song: Song): Promise<void> {
    console.log('SongDummyRepository.save', song);

    return void 0;
  }
}
