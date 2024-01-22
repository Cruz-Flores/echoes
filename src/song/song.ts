import { Version } from '@echoes/core';
import { DanceLog } from '../dance-log/dance-log';

export class Song {
  private id: string;
  private level: number;
  private perceivedLevel: number;
  private version: Version;
  private name: string;
  private kcalsAverage: number;
  private bodyImpact: number;

  constructor({
    id,
    level,
    name,
    perceivedLevel,
    version,
    bodyImpact,
  }: {
    id: string;
    level: number;
    perceivedLevel: number;
    version: Version;
    name: string;
    bodyImpact: number;
  }) {
    this.setId(id);
    this.setLevel(level);
    this.setPerceivedLevel(perceivedLevel);
    this.setVersion(version);
    this.setName(name);
    this.setBodyImpact(bodyImpact);
  }

  static of({
    id,
    level,
    perceivedLevel,
    version,
    name,
    kcalsAverage = 0,
    bodyImpact,
  }: {
    id: string;
    level: number;
    perceivedLevel: number;
    version: Version;
    name: string;
    kcalsAverage?: number;
    bodyImpact: number;
  }): Song {
    const song = new this({
      id,
      level,
      perceivedLevel,
      version,
      name,
      bodyImpact,
    });
    if (typeof kcalsAverage === 'number') {
      song.setKcalsAverage(kcalsAverage);
    }

    return song;
  }

  getBodyImpact() {
    return this.bodyImpact;
  }

  getId() {
    return this.id;
  }

  getLevel() {
    return this.level;
  }

  getPerceivedLevel() {
    return this.perceivedLevel;
  }

  getVersion() {
    return this.version;
  }

  getName() {
    return this.name;
  }

  getKcalsAverage() {
    return this.kcalsAverage;
  }

  calculateKcalsAverage(danceLogs: DanceLog[]) {
    if (danceLogs.length === 0) {
      return;
    }
    const kcalsAverage = danceLogs.reduce(
      (acc, danceLog) => acc + danceLog.getKcal(),
      0,
    );

    this.setKcalsAverage(
      parseFloat((kcalsAverage / danceLogs.length).toFixed(2)),
    );
  }

  private setKcalsAverage(kcalsAverage: number) {
    this.kcalsAverage = kcalsAverage;
  }

  private setId(id: string) {
    this.id = id;
  }

  private setLevel(level: number) {
    this.level = level;
  }

  private setPerceivedLevel(perceivedLevel: number) {
    this.perceivedLevel = perceivedLevel;
  }

  private setVersion(version: Version) {
    this.version = version;
  }

  private setName(name: string) {
    this.name = name;
  }

  private setBodyImpact(bodyImpact: number) {
    this.bodyImpact = bodyImpact;
  }
}
