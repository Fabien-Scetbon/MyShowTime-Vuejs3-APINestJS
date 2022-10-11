import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  // add a event
  @Post('/createevent')
  async addEvent(@Res() res, @Body() createEventDTO: CreateEventDTO) {
    const event = await this.eventService.addEvent(createEventDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Event has been created successfully',
      event,
    });
  }

  // Retrieve events list
  @Get('events')
  async getAllEvent(@Res() res) {
    const events = await this.eventService.getAllEvent();
    return res.status(HttpStatus.OK).json(events);
  }

  // Fetch a particular event using ID
  @Get('event/:eventID')
  async getEvent(@Res() res, @Param('eventID') eventID) {
    const event = await this.eventService.getEvent(eventID);
    if (!event) throw new NotFoundException('Event does not exist!');
    return res.status(HttpStatus.OK).json(event);
  }
  // Update a event's details
  @Put('/updateevent')
  async updateEvent(
    @Res() res,
    @Query('eventID') eventID,
    @Body() createEventDTO: CreateEventDTO,
  ) {
    const event = await this.eventService.updateEvent(
      eventID,
      createEventDTO,
    );
    if (!event) throw new NotFoundException('Event does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Event has been successfully updated',
      event,
    });
  }

  // Delete a event
  @Delete('/deleteevent')
  async deleteEvent(@Res() res, @Query('eventID') eventID) {
    const event = await this.eventService.deleteEvent(eventID);
    if (!event) throw new NotFoundException('Event does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Event has been deleted',
      event,
    });
  }
}