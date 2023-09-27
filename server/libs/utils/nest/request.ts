import { FastifyRequest } from 'fastify';
import { UserAuth } from '@lib/core/identity/identity-auth/domain';

export interface IRequest extends FastifyRequest {
  user: UserAuth;
  token?: string;
  userInfo?: { tutorialStage?: string };
}
export type IError = Error & { extra?: { [key: string]: string }; tags?: { [key: string]: string } };
