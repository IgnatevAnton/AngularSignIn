/*
 * Public API Surface of cqrs
 */

export { IQuery } from './lib/interfaces/IQuery';
export type { IQueryToken } from './lib/interfaces/IQueryToken';

export { ICommand } from './lib/interfaces/ICommand';
export type { ICommandToken } from './lib/interfaces/ICommandToken';

export type { IQueryHandler } from './lib/interfaces/IQueryHandler';
export type { IQueryHandlerToken } from './lib/interfaces/IQueryHandlerToken';
export type { ISender } from './lib/interfaces/ISender';
export { Sender } from './lib/services/Sender';
