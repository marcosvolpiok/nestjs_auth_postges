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
import {
  ContactResponseDto,
  AdminContactResponseDto,
  CreateContactDto,
} from './contact.dto';

@Controller('contact')
@UseInterceptors(ClassSerializerInterceptor)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  contact(
    @Request() req,
  ): Promise<ContactResponseDto[] | AdminContactResponseDto[]> {
    return this.contactService.findByUserId(req.user.userId, req.user.role);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  createContact(
    @Body() ContactDto: CreateContactDto,
    @Request() req,
  ): Promise<Contact> {
    return this.contactService.create(
      ContactDto.name,
      ContactDto.email,
      req.user.userId,
    );
  }
}
