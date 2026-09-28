import { Version } from '@echoes/core';

import { Song } from '../../song';
import { SongRepository } from '../../interfaces/song.repository';

export class SongDummyRepository implements SongRepository {
  async findOne(specification: any): Promise<Song> {
    const song = Song.of({
      id: '8ce76a92-8ad7-4d6f-a6b0-b2d16a994fe4',
      level: 1,
      perceivedLevel: 1,
      version: Version.ExceedToZero,
      name: 'Song 1',
      bodyImpact: 1,
      kcalsAverage: 79,
    });

    return song;
  }

  async findAll(specification: any): Promise<Song[]> {
    return [
      Song.of({
        id: '4ee9fd41-ee62-4178-91b2-2c56170cd5b9',
        level: 1,
        perceivedLevel: 1,
        version: Version.ExceedToZero,
        name: 'Song 1',
        bodyImpact: 1,
        kcalsAverage: 79,
      }),
      Song.of({
        id: '2b6574b0-b318-4849-9704-750f2ffdd06b',
        level: 2,
        perceivedLevel: 2,
        version: Version.ExceedToZero,
        name: 'Song 2',
        bodyImpact: 1,
        kcalsAverage: 79,
      }),
      Song.of({
        id: '9729f91a-544a-4245-b696-6887ae93c638',
        level: 3,
        perceivedLevel: 3,
        version: Version.ExceedToZero,
        name: 'Song 3',
        bodyImpact: 1,
        kcalsAverage: 79,
      }),
      Song.of({
        id: 'f9bf8426-a1f5-4fc1-ac70-c15beed0d0f2',
        level: 4,
        perceivedLevel: 4,
        version: Version.ExceedToZero,
        name: 'Song 4',
        bodyImpact: 1,
        kcalsAverage: 79,
      }),
      Song.of({
        id: '24c1bbe6-ba77-49bd-bd72-f58f7e3b4939',
        level: 5,
        perceivedLevel: 5,
        version: Version.ExceedToZero,
        name: 'Song 5',
        bodyImpact: 1,
        kcalsAverage: 79,
      }),
    ];
  }

  save(song: Song): Promise<void> {
    console.log('SongDummyRepository.save', song);

    return void 0;
  }
}
