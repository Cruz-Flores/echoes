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
        p, admin, data1, read, 08:00, 19:00
        p, user, data2, write, 08:00, 17:00
        g, alice, admin
        g, bob, user
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
    // Simulando una hora actual en formato HH:MM para el ejemplo
    const currentTime = new Date().toTimeString().substring(0, 5);
    return enforcer.enforce(sub, obj, act, currentTime);
  }
}
