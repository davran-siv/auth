import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { WebhookDomain } from '../../domains/webhook/webhooks.domain'

@Controller()
export class WebhookController {
  constructor(
    private webhookDomain: WebhookDomain,
  ) {}

  @Post()
  createOne(@Body() dto: any): Promise<any> {
    return this.webhookDomain.createOne(dto)
  }

  @Put('id')
  updateOne(
    @Param('id') id: string,
    @Body() dto: any
  ): Promise<any> {
    return this.webhookDomain.updateOne(id, dto)
  }

  @Delete('id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.webhookDomain.deleteOne(id)
  }

  @Get()
  getAll(@Body() dto: any): Promise<any> {
    return this.webhookDomain.getAll()
  }

  @Get(':id')
  getOneById(@Param() id: string): Promise<any> {
    return this.webhookDomain.getOneById(id)
  }
}
