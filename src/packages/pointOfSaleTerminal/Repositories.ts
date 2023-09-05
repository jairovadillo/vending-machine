import axios from "axios";
import { urls } from "../../Urls";

class POSTerminalRepository {
  async updateWallet(newBalance: number, customerName: string): Promise<any> {
    return axios.put(urls.updateWallet, {
      new_balance: newBalance,
      customer_name: customerName,
    });
  }
}

export default POSTerminalRepository;
