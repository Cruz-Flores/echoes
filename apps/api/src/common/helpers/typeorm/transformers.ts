import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string): number {
    return parseFloat(value);
  }
}

export class IntTransformer implements ValueTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string): number {
    return parseInt(value, 10);
  }
}
