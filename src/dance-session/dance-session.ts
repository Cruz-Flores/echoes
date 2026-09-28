export class DanceSession {
  private id: string;
  private startedAt: Date;
  private endedAt: Date | null;
  private targetSongsCount: number;

  constructor({
    id,
    startedAt,
    endedAt,
    targetSongsCount,
  }: {
    id: string;
    startedAt: Date;
    endedAt: Date | null;
    targetSongsCount: number;
  }) {
    this.setId(id);
    this.setStartedAt(startedAt);
    this.setEndedAt(endedAt);
    this.setTargetSongsCount(targetSongsCount);
  }

  static of({
    id,
    startedAt,
    endedAt = null,
    targetSongsCount,
  }: {
    id: string;
    startedAt: Date;
    endedAt?: Date | null;
    targetSongsCount: number;
  }): DanceSession {
    return new this({
      id,
      startedAt,
      endedAt,
      targetSongsCount,
    });
  }

  close() {
    if (this.endedAt !== null) {
      throw new Error('Session is already closed');
    }
    this.setEndedAt(new Date());
  }

  isActive(): boolean {
    return this.endedAt === null;
  }

  getId(): string {
    return this.id;
  }

  getStartedAt(): Date {
    return this.startedAt;
  }

  getEndedAt(): Date | null {
    return this.endedAt;
  }

  getTargetSongsCount(): number {
    return this.targetSongsCount;
  }

  private setId(id: string) {
    if (!id) {
      throw new Error('Id is required');
    }
    this.id = id;
  }

  private setStartedAt(startedAt: Date) {
    if (!startedAt) {
      throw new Error('StartedAt is required');
    }
    this.startedAt = startedAt;
  }

  private setEndedAt(endedAt: Date | null) {
    this.endedAt = endedAt;
  }

  private setTargetSongsCount(targetSongsCount: number) {
    if (!targetSongsCount || targetSongsCount < 1) {
      throw new Error('TargetSongsCount must be greater than 0');
    }
    this.targetSongsCount = targetSongsCount;
  }
}
