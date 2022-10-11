import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CustomerModule} from 'src/customer/customer.module'

@Module({
  imports: [CustomerModule],
  providers: [AuthService]
})
export class AuthModule {}
