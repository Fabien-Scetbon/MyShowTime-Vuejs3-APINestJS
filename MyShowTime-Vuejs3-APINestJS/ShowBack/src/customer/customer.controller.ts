import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // auth
  @Post('/createcustomer')
  addCustomer(@Body(ValidationPipe) createCustomerDTO: CreateCustomerDTO) {
    return this.customerService.addCustomer(createCustomerDTO);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
    return this.customerService.signIn(authCredentialsDTO);
  }

  // add a customer
//   @Post('/create')
//   async addCustomer(
//     @Res() res,
//     @Body(ValidationPipe) createCustomerDTO: CreateCustomerDTO,
//   ) {
//     const customer = await this.customerService.addCustomer(createCustomerDTO);
//     return res.status(HttpStatus.OK).json({
//       message: 'Customer has been created successfully',
//       customer,
//     });
//   }

  // Retrieve customers list
  @Get('customers')
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  // Fetch a particular customer using ID
  @Get('customer/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.getCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  // Update a customer's details
    
  @Put('/updatecustomer')
  async updateCustomer(
    @Res() res,
    @Query('customerID') customerID,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const customer = await this.customerService.updateCustomer(
      customerID,
      createCustomerDTO,
    );
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer,
    });
  }

  // Delete a customer
  @Delete('/deletecustomer')
  async deleteCustomer(@Res() res, @Query('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }
}