import { IsString, Length, IsNotEmpty, IsInt, IsIn} from 'class-validator';
import { AuthCredentialsDTO } from './auth-credentials.dto';

export class CreateCustomerDTO extends AuthCredentialsDTO{

    @IsString()
    @Length(1, 20)
    first_name: string;

    @IsString()
    @Length(1, 20)
    last_name: string;

    @IsString()
    @Length(6, 20)
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsInt()
    @IsIn([0,1])
    status: number;

    readonly created_at: Date;
}