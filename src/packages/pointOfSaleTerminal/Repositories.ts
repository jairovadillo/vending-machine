import axios from "axios";
import { urls } from "../../Urls";

class POSTerminalRepository {
  async updateWallet(newBalance: number, customerName: string): Promise<any> {
    return axios.put(urls.updateWallet, {
      total_amount: newBalance,
      customer_name: customerName,
    });
  }
}

export default POSTerminalRepository;
