import { User } from '@lib/core/user/user-core/domain';
import { UserEntity } from '@lib/core/user/user-core/db-adapter';

export const getUserFixture = (): User => {
  const user = new User(new UserEntity({}));

  return user;
};
