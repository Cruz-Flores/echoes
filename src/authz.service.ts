import { Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer, StringAdapter } from 'casbin';

@Injectable()
export class AuthzService {
  private enforcer: Enforcer;

  async getEnforcer() {
    if (!this.enforcer) {
      const model = 'model.conf';
      // Políticas definidas directamente como un string para el adaptador
      const policies = `
        p, alice, data1, read
        p, bob, data2, write
      `;
      const adapter = new StringAdapter(policies);
      this.enforcer = await newEnforcer(model, adapter);
    }
    return this.enforcer;
  }

  async checkPermission(
    sub: string,
    obj: string,
    act: string,
  ): Promise<boolean> {
    const enforcer = await this.getEnforcer();
    return enforcer.enforce(sub, obj, act);
  }
}
