import { ICreateCheckDto } from '../types/check.dto.types';
import { TransformString } from '@lib/utils';

export class CreateCheckDto implements ICreateCheckDto {
  @TransformString()
  code!: string;
}
