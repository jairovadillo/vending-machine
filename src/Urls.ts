import { AppConfig } from "./Config";

export const urls = {
  updateWallet: AppConfig.BACKEND_URL + "/wallet/",
  getSlots: AppConfig.BACKEND_URL + "/products/",
  createOrder: AppConfig.BACKEND_URL + "/orders/",
  signIn: AppConfig.BACKEND_URL + "/customers/",
};
