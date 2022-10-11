import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    private jwtService: JwtService,
  ) {}

  // pour auth
  findOneByEmail(email: string) {
    return this.customerModel.findOne({ email });
  }

  createAuthentificationToken(id: string) {
    return this.jwtService.sign({ id });
  }

  //   async signUp(createCustomerDTO: CreateCustomerDTO) {
  //     const userFoundByEmail = await this.findOneByEmail(createCustomerDTO.email);
  //     if (userFoundByEmail) {
  //       throw new ConflictException('User already exists');
  //     }

  //     createCustomerDTO.password = await hash(createCustomerDTO.password, 10);

  //     const user = new this.customerModel(createCustomerDTO);
  //     await user.save();
  //     const token = this.createAuthentificationToken(user._id);
  //     return { message: 'User is signed up', token };
  //   }

  async signIn(authCredentialsDTO: AuthCredentialsDTO) {
    const userFoundByEmail = await this.findOneByEmail(
      authCredentialsDTO.email,
    );
    if (!userFoundByEmail) {
      throw new UnauthorizedException('Email not found');
    }

    const passwordsMatch = await compare(
      authCredentialsDTO.password,
      userFoundByEmail.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Passwords not match');
    }
      // const token = this.createAuthentificationToken(userFoundByEmail._id);
      const userId = userFoundByEmail._id;
      const status = userFoundByEmail.status;
    return { message: 'User is signed in', userId , status};
  }

  // fetch all customers
  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }
  // Get a single customer
  async getCustomer(customerID): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID).exec();
    return customer;
  }
  // post a single customer

  //   async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
  //     const newCustomer = await new this.customerModel(createCustomerDTO);
  //     return newCustomer.save();
  //   }

  async addCustomer(createCustomerDTO: CreateCustomerDTO) {
    const userFoundByEmail = await this.findOneByEmail(createCustomerDTO.email);
    if (userFoundByEmail) {
      throw new ConflictException('Email already exists');
    }

    createCustomerDTO.password = await hash(createCustomerDTO.password, 10);

    const user = new this.customerModel(createCustomerDTO);
    await user.save();
    const token = this.createAuthentificationToken(user._id);
    return { message: 'User is signed up', token };
  }

  // Edit customer details

  async updateCustomer(
    customerID,
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    const userFoundByEmail = await this.findOneByEmail(createCustomerDTO.email);
    // console.log('customerTDO');
    // console.log(createCustomerDTO);
    // console.log('userFoundByEmail');
    // console.log(userFoundByEmail);
    // console.log('UFBE_id');
    //   if (userFoundByEmail) { console.log(userFoundByEmail._id); }
    // console.log('customerID');
    // console.log(customerID);

    if (userFoundByEmail) {
      if (userFoundByEmail._id != customerID) {
        // console.log(userFoundByEmail._id != customerID);

        throw new ConflictException('Email already exists');
      } else {
        if (createCustomerDTO.password != userFoundByEmail.password) {
          createCustomerDTO.password = await hash(createCustomerDTO.password, 10,);
        }
      }
    } 
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(
        customerID,
        createCustomerDTO,
        { new: true },
      );
      return updatedCustomer;
    
  }

  //   Edit customer details
  //   async updateCustomer(
  //     customerID,
  //     createCustomerDTO: CreateCustomerDTO,
  //   ): Promise<Customer> {

  //     // createCustomerDTO.password = await hash(createCustomerDTO.password, 10);
  //     const updatedCustomer = await this.customerModel.findByIdAndUpdate(
  //       customerID,
  //       createCustomerDTO,
  //       { new: true },
  //     );
  //     return updatedCustomer;
  //   }

  // Delete a customer
  async deleteCustomer(customerID): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerID,
    );
    return deletedCustomer;
  }
}
