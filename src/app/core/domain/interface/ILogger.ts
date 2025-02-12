export interface ILogger {
  info(name: string, ...message: any[]): void
  warning(name: string, ...message: any[]): void
  error(name: string, ...message: any[]): void
  time(name: string, time: number): void
}
