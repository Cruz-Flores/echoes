import { Song } from 'src/song/song';
import { DanceLog } from '../dance-log';
import { DanceLogRepository } from '../interfaces/dance-log.repository';
import { Version } from '@echoes/core';

export class DanceLogDummyRepository implements DanceLogRepository {
  async findOne(q: any): Promise<DanceLog> {
    console.log('DanceLogDummyRepository.findOne', q);
    const danceLog = DanceLog.of({
      id: '123',
      kcal: 123,
      session: 123,
    });
    const song = Song.of({
      id: '123',
      name: 'song name',
      level: 1,
      perceivedLevel: 1,
      version: Version.ExceedToZero,
      bodyImpact: 1,
    });
    danceLog.assignSong(song);

    return danceLog;
  }

  async findAll(q: any): Promise<DanceLog[]> {
    console.log('DanceLogDummyRepository.findAll', q);

    const song = Song.of({
      id: '123',
      name: 'song name',
      level: 1,
      perceivedLevel: 1,
      version: Version.ExceedToZero,
      bodyImpact: 1,
    });
    const danceLogs = [
      DanceLog.of({
        id: '123',
        kcal: 123,
        session: 123,
      }),
      DanceLog.of({
        id: '123',
        kcal: 123,
        session: 123,
      }),
      DanceLog.of({
        id: '123',
        kcal: 123,
        session: 123,
      }),
    ];
    danceLogs.forEach((danceLog) => danceLog.assignSong(song));

    return danceLogs;
  }

  async save(danceLog: any): Promise<void> {
    console.log('DanceLogDummyRepository.save', danceLog);

    return void 0;
  }
}
