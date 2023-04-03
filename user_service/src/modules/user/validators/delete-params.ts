import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}
