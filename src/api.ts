import axios from "axios";

const simulateRequest = () => {
  const payload = [
    {
      title: "Pastís de formatge",
      price: 2,
    },
    {
      title: "Carrot cake",
      price: 2,
    },
    {
      title: "Recuit de fonteta",
      price: 2,
    },
    {
      title: "Crema catalana",
      price: 2,
    },
    {
      title: "Valencià",
      price: 2,
    },
    {
      title: "Bisbalenc",
      price: 2,
    },
    {
      title: "Xuixo de crema",
      price: 2,
    },
    {
      title: "Catànies",
      price: 2,
    },
    {
      title: "Panellets",
      price: 2,
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: payload });
    }, 1000);
  });
};

export const api = {
  getProducts: async () => simulateRequest(),
  // getProducts: () => axios.get(process.env.BACKEND_URL + "/products"),
};
