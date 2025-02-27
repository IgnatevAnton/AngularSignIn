/*
 * Public API Surface of cqrs
 */

export { Query } from './lib/entities/Query';
export { Command } from './lib/entities/Command';
export { Sender } from './lib/entities/Sender';

export type { IQuery } from './lib/interfaces/IQuery';
export type { ICommand } from './lib/interfaces/ICommand';

export type { IRequestHandler } from './lib/interfaces/IRequestHandler';
export type { IRequestHandlerToken } from './lib/interfaces/IRequestHandlerToken';
export type { ISender } from './lib/interfaces/ISender';
