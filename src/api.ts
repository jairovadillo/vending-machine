import axios from "axios";

export const api = {
  signIn: (customerName: string) =>
    axios.post(process.env.REACT_APP_BACKEND_URL + "/customers/", {
      customer_name: customerName,
    }),
  getSlots: () => axios.get(process.env.REACT_APP_BACKEND_URL + "/products/"),
  createOrder: (productId: string, customerName: string) =>
    axios.post(process.env.REACT_APP_BACKEND_URL + "/order/", {
      product_id: productId,
      customer_name: customerName,
    }),
};
