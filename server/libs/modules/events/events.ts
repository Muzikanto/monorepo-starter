import { AppEvent } from './app-event';

export type IMintNftEvent = { tokenId: string };
export class MintNftEvent extends AppEvent<IMintNftEvent> {}

export type ITransferNftEvent = { tokenId: string; from: string; to: string };
export class TransferNftEvent extends AppEvent<ITransferNftEvent> {}

export type ITransferFtEvent = { value: string; from: string; to: string };
export class TransferFtEvent extends AppEvent<ITransferFtEvent> {}
