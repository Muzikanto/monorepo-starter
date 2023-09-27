import { UserCoreApplicationModule } from '@lib/core/user/user-core/application-module';
import { IUserAuthDto } from '@lib/core/identity/identity-auth/domain/types/user-auth.types';
import { getTestingApplication } from '@lib/testing';
import { ITestingApplication } from '@lib/testing/types';

describe('user e2e', () => {
  let app: ITestingApplication;
  let user: IUserAuthDto;

  beforeEach(async () => {
    app = await getTestingApplication({ imports: [UserCoreApplicationModule] });

    // user = await testingRegisterUser(app, { eid: '1' });
  });

  afterEach(async () => {
    await app.close();
  });

  it('get', async () => {
    // const resCurrent = await app.injectGet<object, IUserDataDto>({
    //   url: '/user',
    //   token: user.authKey,
    //   args: {},
    // });
    //
    // expect(resCurrent.status).toBe(200);
    // expect(resCurrent.data.user.id).toBe(user.id);
    //
    // const resProfile = await app.injectGet<object, IUserDto>({
    //   url: `/user/profile/${user.id}`,
    //   args: {},
    // });
    //
    // expect(resProfile.status).toBe(200);
    // expect(resProfile.data.id).toBe(user.id);
  });
});
