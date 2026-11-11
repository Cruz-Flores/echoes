import { DanceLog } from '../dance-log';

export abstract class DanceLogRepository {
  abstract save(danceLog: DanceLog): Promise<void>;
  abstract findAll(q: any): Promise<DanceLog[]>;
  abstract findOne(q: any): Promise<DanceLog>;
}
