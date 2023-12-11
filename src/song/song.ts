import { Version } from '@echoes/core';

export class Song {
  private id: string;
  private level: number;
  private perceivedLevel: number;
  private version: Version;
  private name: string;

  constructor({
    id,
    level,
    name,
    perceivedLevel,
    version,
  }: {
    id: string;
    level: number;
    perceivedLevel: number;
    version: Version;
    name: string;
  }) {
    this.setId(id);
    this.setLevel(level);
    this.setPerceivedLevel(perceivedLevel);
    this.setVersion(version);
    this.setName(name);
  }

  static of({
    id,
    level,
    perceivedLevel,
    version,
    name,
  }: {
    id: string;
    level: number;
    perceivedLevel: number;
    version: Version;
    name: string;
  }) {
    return new Song({
      id,
      level,
      perceivedLevel,
      version,
      name,
    });
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
}
