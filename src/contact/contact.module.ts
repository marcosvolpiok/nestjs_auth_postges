import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ContactProviders } from './contact.providers';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [...ContactProviders, ContactService],
  exports: [ContactService],
})
export class ContactModule {}
