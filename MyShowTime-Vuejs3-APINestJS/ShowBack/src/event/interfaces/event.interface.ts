import { Document } from 'mongoose';

export interface Event extends Document {
  readonly title: String;
  readonly artist: String;
  readonly show: String;
  readonly date: String;
  readonly time: String;
  readonly place: String;
  readonly price: Number;
  readonly content: String;
  readonly nb_ticket_send: Number;
  readonly nb_ticket_total: Number;
  readonly created_at: Date;
}
