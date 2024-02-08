import { Module } from '@nestjs/common';
import { BusinessService } from './service/business.service';
import { BusinessController } from './controller/business.controller';
import { HttpModule } from '@nestjs/axios';
import { BusinessHttp } from './infrastructure/business.http';

@Module({
  imports: [HttpModule],
  controllers: [BusinessController],
  providers: [BusinessService, BusinessHttp],
})
export class BusinessModule {}
