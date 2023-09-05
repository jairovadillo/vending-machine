import axios from "axios";
import { urls } from "../../Urls";
import { SlotProps } from "./DTOs";

class SlotsRepository {
  async getSlots(): Promise<Array<SlotProps>> {
    const response = await axios.get(urls.getSlots);

    let result: SlotProps[] = [];
    response.data.slots.forEach((row: SlotProps[]) => {
      row.forEach((slot) => {
        result.push(slot);
      });
    });

    return result;
  }

  async createOrder(slotId: string, customerName: string): Promise<any> {
    const response = axios.post(urls.createOrder, {
      slot_id: slotId,
      customer_name: customerName,
    });
    return (await response).data.new_balance;
  }
}

export default SlotsRepository;
