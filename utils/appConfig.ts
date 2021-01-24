class AppConfig {
  public readonly databaseConnectionString: string = '';
  public readonly isOnServer = typeof window === 'undefined';

  constructor() {
    this.databaseConnectionString = this.loadEnvironmentVariable(
      'DATABASE_CONNECTION_STRING',
    );
  }

  private loadEnvironmentVariable(key: string) {
    const envVariable = process.env[key];

    if (!envVariable && this.isOnServer) {
      throw new Error(`Must configure ${key} environment variable.`);
    }

    return envVariable;
  }
}

export const appConfig = new AppConfig();
