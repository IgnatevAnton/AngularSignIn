export interface ILoggerService {
  info(name: string, ...message: object[]): void;
  warning(name: string, ...message: object[]): void;
  error(name: string, ...message: object[]): void;
  time(name: string, time: number): void;
}
