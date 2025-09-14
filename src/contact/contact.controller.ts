import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
@UseInterceptors(ClassSerializerInterceptor)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  contact(@Request() req): Promise<Contact[]> {
    return this.contactService.findByUserId(req.user.userId);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  createContact(
    @Body() ContactDto: { name: string },
    @Request() req,
  ): Promise<Contact> {
    return this.contactService.create(
      ContactDto.name,
      req.user.userId,
    );
  }
}
