import { Resend } from "resend";

/**
 * Singleton class for managing the Resend instance.
 */

export class ResendSingleton {
  private static instance: any;

  private constructor() {}

  /**
   * Returns the singleton instance of Resend.
   * If the instance does not exist, it creates a new one using the provided RESEND_API.
   * @returns The Resend singleton instance.
   */

  public static getInstance() {
    if (!ResendSingleton.instance) {
      ResendSingleton.instance = new Resend(import.meta.env.RESEND_API);
    }

    return ResendSingleton.instance;
  }
}
