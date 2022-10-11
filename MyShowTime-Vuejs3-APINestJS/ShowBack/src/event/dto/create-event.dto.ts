import { IsString, Length, IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @Length(1, 20)
  title: string;

  @IsString()
  @Length(1, 20)
  artist: string;

  @IsString()
  @Length(1, 20)
  show: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsString()
  @Length(1, 20)
  time: string;

  @IsString()
  @Length(1, 20)
  place: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsString()
  @Length(1, 100)
  content: string;

  @IsNotEmpty()
  @IsInt()
  nb_ticket_send: Number;

  @IsNotEmpty()
  @IsInt()
  nb_ticket_total: Number;

  readonly created_at: Date;
}
