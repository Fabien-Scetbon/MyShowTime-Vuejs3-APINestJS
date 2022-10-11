import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class AuthCredentialsDTO {
 
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  password: string;
  
}

