import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  readonly email: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  readonly password: string;
}
