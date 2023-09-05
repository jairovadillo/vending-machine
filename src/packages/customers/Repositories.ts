import axios from "axios";
import { urls } from "../../Urls";
import { CustomerProps } from "./DTOs";

class CustomersRepository {
  async getCustomer(customerName: string): Promise<CustomerProps> {
    const response: any = axios.post(urls.signIn, {
      customer_name: customerName,
    });
    return (await response).data;
  }
}

export default CustomersRepository;
