import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [...photoProviders, PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
