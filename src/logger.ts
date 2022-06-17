
export interface ILogger {
  log(message: string, ...args: any[]): void;
}

export class ConsoleLogger implements ILogger {
  log(message: string, ...args: any[]): void {
    console.log(message, args);
  }
}

export class LoggerFactory {
  public static getInstance(): ILogger {
    if (!this.logger) {
      this.logger = new ConsoleLogger();
    }
    return this.logger;
  }

  private static logger: ILogger;
}

