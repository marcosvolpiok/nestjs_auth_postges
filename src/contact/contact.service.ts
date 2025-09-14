import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findByUserId(userId: number): Promise<Contact[]> {
    return this.contactRepository.find({ where: { userId } });
  }

  async create(name: string, userId: number): Promise<Contact> {
    const contact = this.contactRepository.create({
      name,
      userId,
    });
    return this.contactRepository.save(contact);
  }
}
