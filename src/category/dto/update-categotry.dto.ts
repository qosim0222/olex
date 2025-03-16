import { PartialType } from '@nestjs/swagger';
import { CreateCategotryDto } from './create-categotry.dto';

export class UpdateCategotryDto extends PartialType(CreateCategotryDto) {}
