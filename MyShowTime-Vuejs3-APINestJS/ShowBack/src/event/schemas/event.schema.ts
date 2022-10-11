import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  title: String,
  artist: String,
  show: String,
  date: String,
  time: String,
  place: String,
  price: Number,
  content: String,
  nb_ticket_send: { type: Number, default: 0 },
  nb_ticket_total: Number,
  created_at: { type: Date, default: Date.now },
});
