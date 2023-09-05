import { AppConfig } from "./Config";

export const urls = {
  updateWallet: AppConfig.BACKEND_URL + "/wallet/",
  getSlots: AppConfig.BACKEND_URL + "/slots/",
  createOrder: AppConfig.BACKEND_URL + "/order/",
  signIn: AppConfig.BACKEND_URL + "/customers/",
};
