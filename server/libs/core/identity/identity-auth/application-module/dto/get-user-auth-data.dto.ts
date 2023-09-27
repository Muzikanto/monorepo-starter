import { TransformString } from '@lib/utils';

export class GetUserAuthDataDto {
  @TransformString()
  v!: string;

  @TransformString()
  vendor!: string;

  @TransformString()
  cpv!: string;

  @TransformString()
  eid!: string;

  @TransformString()
  gid!: string;
}
