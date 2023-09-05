import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { updateBalance } from "../../slice";
import { Navigate } from "react-router";
import { SlotProps } from "./DTOs";
import SlotsRepository from "./Repositories";

export const Slot = ({ id, product, quantity }: SlotProps) => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleOrderProduct = async (slotId: string) => {
    if (!customerName) {
      return;
    }
    try {
      const response: any = await new SlotsRepository().createOrder(
        slotId,
        customerName
      );
      dispatch(updateBalance(response.newBalance));
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontSize: 30 }}>
        {product.name}
      </Typography>
      <Box>{product.price}€</Box>
      <Button onClick={() => handleOrderProduct(id)}>Buy</Button>
    </Box>
  );
};

export const Slots = () => {
  const [slots, setSlots] = useState<SlotProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const slots: SlotProps[] = await new SlotsRepository().getSlots();
        setSlots(slots);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (!customerName) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25%" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: 40 }}>
        Productes
      </Typography>
      <Grid container spacing={2}>
        {slots.map((slot, rowIdx) => (
          <Grid item xs={4}>
            <Slot {...slot} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
