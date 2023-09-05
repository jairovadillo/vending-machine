import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
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

    if (quantity < 1) {
      alert("Producte estgotat");
      return;
    }

    try {
      const newBalance = await new SlotsRepository().createOrder(
        slotId,
        customerName
      );

      dispatch(updateBalance(newBalance));
    } catch (error: any) {
      setError(error);
    }
  };

  let styleOnHover: any = {
    cursor: "not-allowed",
  };
  if (quantity > 0) {
    styleOnHover.cursor = "pointer";
    styleOnHover.backgroundColor = "#333";
  }

  return (
    <Box
      onClick={() => handleOrderProduct(id)}
      sx={{
        "&:hover": styleOnHover,
        padding: 2,
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          maxWidth: "100%",
        }}
        src={product.image}
      />
      <Typography variant="h2" sx={{ fontSize: 30 }}>
        {product.name}
      </Typography>
      <Box>{product.price}€</Box>
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
