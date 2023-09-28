import { ICreateExampleDto } from '../types/battle.dto.types';
import { TransformInt } from '@lib/utils';

export class CreateExampleDto implements ICreateExampleDto {
  @TransformInt()
  value!: number;
}
