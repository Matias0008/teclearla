import { Resend } from "resend";

export class ResendSingleton {
  private static instance: any;

  private constructor() {}

  public static getInstance() {
    if (!ResendSingleton.instance) {
      ResendSingleton.instance = new Resend(import.meta.env.RESEND_API);
    }

    return ResendSingleton.instance;
  }
}
