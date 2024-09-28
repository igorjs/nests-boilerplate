import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor() {}

  @Get('healthcheck')
  @Header('Cache-Control', 'no-cache')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  healthcheck() {
    return 'healthy';
  }
}
