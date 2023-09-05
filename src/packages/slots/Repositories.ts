import axios from "axios";
import { urls } from "../../Urls";
import { SlotProps } from "./DTOs";

class SlotsRepository {
  async getSlots(): Promise<Array<SlotProps>> {
    const response = axios.get(urls.getSlots);

    return [
      {
        id: "random id",
        quantity: 10,
        product: {
          name: "cola",
          price: 1000,
        },
      },
    ];
  }
  async createOrder(slotId: string, customerName: string): Promise<any> {
    return axios.post(urls.createOrder, {
      slot_id: slotId,
      customer_name: customerName,
    });
  }
}

export default SlotsRepository;
