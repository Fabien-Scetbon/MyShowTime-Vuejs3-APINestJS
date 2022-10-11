import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';   // ../customer/..... ?

@Injectable()
export class AuthService {
    constructor(private customerService: CustomerService) { }
    
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.customerService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
