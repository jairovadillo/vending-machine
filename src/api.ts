import axios from "axios";

export const api = {
  getProducts: () =>
    axios.get(process.env.REACT_APP_BACKEND_URL + "/products/"),
  signIn: (customerName: string) =>
    axios.post(process.env.REACT_APP_BACKEND_URL + "/signin/", {
      customer_name: customerName,
    }),

  updateWallet: (newBalance: number, customerName: string) =>
    axios.put(process.env.REACT_APP_BACKEND_URL + "/wallet/", {
      total_amount: newBalance,
      customer_name: customerName,
    }),
  createOrder: (productId: string, customerName: string) =>
    axios.post(process.env.REACT_APP_BACKEND_URL + "/order/", {
      product_id: productId,
      customer_name: customerName,
    }),
};
