import { IGetExampleDto } from '../types/index.dto.types';
import { TransformID } from '../../../../../../utils/nest/validate';

export class GetExampleDto implements IGetExampleDto {
  @TransformID()
  exampleId!: string;
}
