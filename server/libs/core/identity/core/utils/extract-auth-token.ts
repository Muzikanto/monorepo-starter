import { IRequest } from '@lib/utils';

export function extractAuthToken(req: IRequest): string | undefined {
  let token = req.headers?.authorization || (req.query as { ak?: string })?.ak || (req.body as { ak?: string })?.ak;

  if (!token) {
    const cookie = req.headers.cookie?.split('; ').find((el) => el.startsWith('authorization'));

    if (cookie) {
      token = cookie.split('=')[1];
    }
  }

  return token;
}
