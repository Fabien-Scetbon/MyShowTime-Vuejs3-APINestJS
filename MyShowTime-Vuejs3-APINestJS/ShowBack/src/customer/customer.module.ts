import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtModule} from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    JwtModule.register({
      secret: 'monopoli',
      signOptions: {
        expiresIn: '5 years',
      },
    }),
    // PassportModule.register({ defaultStategy: 'jwt' }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
  
})
export class CustomerModule { }