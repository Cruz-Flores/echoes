import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthzService } from './authz.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authzService: AuthzService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  async getData(@Query('user') user, @Query('action') action): Promise<string> {
    const hasPermission = await this.authzService.checkPermission(
      user,
      'data1',
      action,
    );
    if (hasPermission) {
      return `Access granted to ${user}`;
    }
    return `Access denied for ${user}`;
  }
}
