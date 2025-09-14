import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { UserRole } from '../user/user.entity';
import { ContactResponseDto, AdminContactResponseDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findByUserId(userId: number, userRole: UserRole): Promise<ContactResponseDto[] | AdminContactResponseDto[]> {
    const contacts = await this.contactRepository.find({ where: { userId } });
    
    if (userRole === UserRole.ADMIN) {
      return contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        userId: contact.userId,
      }));
    } else {
      return contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        userId: contact.userId,
      }));
    }
  }

  async create(name: string, email: string, userId: number): Promise<Contact> {
    const contact = this.contactRepository.create({
      name,
      email,
      userId,
    });
    return this.contactRepository.save(contact);
  }
}
