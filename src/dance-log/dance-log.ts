import { Song } from '../song/song';

export class DanceLog {
  private id: string;
  private song: Song;
  private kcal: number;
  private session: number;

  constructor({
    id,
    kcal,
    session,
  }: {
    id: string;
    kcal: number;
    session: number;
  }) {
    this.setId(id);
    this.setKcal(kcal);
    this.setSession(session);
  }

  static of({
    id,
    kcal,
    session,
  }: {
    id: string;
    kcal: number;
    session: number;
  }): DanceLog {
    return new this({ id, kcal, session });
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

  getSession(): number {
    return this.session;
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

  private setSession(session: number) {
    this.session = session;
  }
}
