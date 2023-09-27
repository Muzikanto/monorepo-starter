import { FastifyRequest } from 'fastify';

export interface IRequest extends FastifyRequest {
  user: any;
  token?: string;
  userInfo?: { tutorialStage?: string };
}
export type IError = Error & { extra?: { [key: string]: string }; tags?: { [key: string]: string } };
