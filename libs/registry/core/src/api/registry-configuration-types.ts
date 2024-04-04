export interface RegistryConfiguration {

  /**
   * Base URL for all function in service.ts
   */
  baseURL?: string;

  /**
   * Additional configuration options to send with fetch request i.e. if some authentication information is required.
   */
  requestOptionsResolver?: () => RequestInit;

}
