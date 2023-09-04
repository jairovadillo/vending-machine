import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { api } from "../api";
import { updateBalance } from "../slice";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  stock?: number;
}

export const Product = ({ id, name, price }: ProductProps) => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleOrderProduct = async (productId: string) => {
    if (!customerName) {
      return;
    }
    try {
      const response: any = await api.createOrder(productId, customerName);
      dispatch(updateBalance(response.newBalance));
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontSize: 30 }}>
        {name}
      </Typography>
      <Box>{price}€</Box>
      <Button onClick={() => handleOrderProduct(id)}>Buy</Button>
    </Box>
  );
};

export const Products = ({ products }: { products: ProductProps[][] }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: 40 }}>
        Productes
      </Typography>
      <Grid container spacing={2}>
        {products.map((row, rowIdx) => {
          return row.map((product, columnIdx) => (
            <Grid item xs={4}>
              <Product {...product} />
            </Grid>
          ));
        })}
      </Grid>
    </Box>
  );
};
