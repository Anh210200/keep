import { IsNotEmpty, IsString } from 'class-validator';

export class AvatarDto {
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
