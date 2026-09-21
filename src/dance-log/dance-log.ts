import { Song } from '../song/song';

export class DanceLog {
  private id: string;
  private song: Song;
  private kcal: number;
  private sessionId: string;
  private wasOmitted: boolean;
  private dancedAt: Date;

  constructor({
    id,
    kcal,
    sessionId,
    wasOmitted,
    dancedAt,
  }: {
    id: string;
    kcal: number;
    sessionId: string;
    wasOmitted: boolean;
    dancedAt: Date;
  }) {
    this.setId(id);
    this.setKcal(kcal);
    this.setSessionId(sessionId);
    this.setWasOmitted(wasOmitted);
    this.setDancedAt(dancedAt);
  }

  static of({
    id,
    kcal,
    sessionId,
    wasOmitted = false,
    dancedAt,
  }: {
    id: string;
    kcal: number;
    sessionId: string;
    wasOmitted?: boolean;
    dancedAt: Date;
  }): DanceLog {
    return new this({ id, kcal, sessionId, wasOmitted, dancedAt });
  }

  assignSong(song: Song) {
    this.setSong(song);
  }

  getId(): string {
    return this.id;
  }

  getSong(): any {
    return this.song;
  }

  getKcal(): number {
    return this.kcal;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getWasOmitted(): boolean {
    return this.wasOmitted;
  }

  getDancedAt(): Date {
    return this.dancedAt;
  }

  private setId(id: string) {
    this.id = id;
  }

  private setSong(song: any) {
    this.song = song;
  }

  private setKcal(kcal: number) {
    this.kcal = kcal;
  }

  private setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  private setWasOmitted(wasOmitted: boolean) {
    this.wasOmitted = wasOmitted;
  }

  private setDancedAt(dancedAt: Date) {
    this.dancedAt = dancedAt;
  }
}
