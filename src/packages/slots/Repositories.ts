import axios from "axios";
import { urls } from "../../Urls";
import { SlotProps } from "./DTOs";

class SlotsRepository {
  async getSlots(): Promise<Array<SlotProps>> {
    const response = axios.get(urls.getSlots);

    return [
      {
        id: "1",
        quantity: 10,
        product: {
          name: "pastís de formatge",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
      {
        id: "2",
        quantity: 0,
        product: {
          name: "catánies",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
      {
        id: "3",
        quantity: 10,
        product: {
          name: "recuit de fonteta",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
      {
        id: "4",
        quantity: 0,
        product: {
          name: "crema catalana",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
      {
        id: "5",
        quantity: 10,
        product: {
          name: "valencià",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
      {
        id: "6",
        quantity: 10,
        product: {
          name: "xuixo de crema",
          price: 1000,
          image:
            "https://media.istockphoto.com/id/1167344045/photo/cheesecake-slice-new-york-style-classical-cheese-cake.jpg?s=612x612&w=0&k=20&c=y3eh7cFEefAYxB_5Ow2n1OJZML_PqFOdnB5Z9nvXdgw=",
        },
      },
    ];
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
