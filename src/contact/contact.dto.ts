import { UserRole } from '../user/user.entity';

export class ContactResponseDto {
  id: number;
  name: string;
  userId: number;
}

export class AdminContactResponseDto extends ContactResponseDto {
  email: string;
}

export class CreateContactDto {
  name: string;
  email: string;
} 