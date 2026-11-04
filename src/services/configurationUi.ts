export class ConfigurationUiService {
  private static environment = () => {
    const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || '';
    const FRONTEND_PORT = process.env.FRONTEND_PORT || '3000';

    return {
      BACKEND_DOMAIN,
      FRONTEND_PORT,
    };
  };

  public static getConfig() {
    return this.environment();
  }
}
