import { ICreateExampleDto } from '../types/index.dto.types';
import { TransformInt } from '@lib/utils';

export class CreateExampleDto implements ICreateExampleDto {
  @TransformInt()
  value!: number;
}
