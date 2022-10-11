import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './interfaces/event.interface';
import { CreateEventDTO } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}
  // fetch all events
  async getAllEvent(): Promise<Event[]> {
    const events = await this.eventModel.find().exec();
    return events;
  }
  // Get a single event
  async getEvent(eventID): Promise<Event> {
    const event = await this.eventModel.findById(eventID).exec();
    return event;
  }
  // post a single event
  async addEvent(createEventDTO: CreateEventDTO): Promise<Event> {
    const newEvent = await new this.eventModel(createEventDTO);
    return newEvent.save();
  }
  // Edit event details
  async updateEvent(
    eventID,
    createEventDTO: CreateEventDTO,
  ): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      eventID,
      createEventDTO,
      { new: true },
    );
    return updatedEvent;
  }
  // Delete a event
  async deleteEvent(eventID): Promise<any> {
    const deletedEvent = await this.eventModel.findByIdAndRemove(
      eventID,
    );
    return deletedEvent;
  }
}
