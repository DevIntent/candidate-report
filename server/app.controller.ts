import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/_ah/health')
  healthCheck(): void {
    return;
  }
}
