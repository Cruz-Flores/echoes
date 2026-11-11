import { DanceSession } from '../dance-session';

export abstract class DanceSessionRepository {
  abstract findOne(specification: any): Promise<DanceSession>;
  abstract findAll(specification: any): Promise<DanceSession[]>;
  abstract save(danceSession: DanceSession): Promise<void>;
}
