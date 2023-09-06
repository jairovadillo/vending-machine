import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { updateBalance } from "../../slice";
import { Navigate } from "react-router";
import { SlotProps } from "./DTOs";
import SlotsRepository from "./Repositories";
import { debug } from "console";

export const Slot = ({
  id,
  product,
  quantity,
  fetchSlots,
}: SlotProps & { fetchSlots: Function }) => {
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
      alert("Producte esgotat");
      return;
    }

    if (product.price > balance) {
      alert("No tens suficients calers per comprar aquest postre!");
      return;
    }

    try {
      const newBalance = await new SlotsRepository().createOrder(
        slotId,
        customerName
      );
      dispatch(updateBalance(newBalance));
      alert(`Genial ${customerName}, disfruta del ${product.name}!`);
      fetchSlots();
    } catch (error: any) {
      setError(error);
      throw error;
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
    <Card
      onClick={() => handleOrderProduct(id)}
      sx={{
        "&:hover": styleOnHover,
        padding: 2,
        marginTop: 5,
        textAlign: "center",
        maxHeight: 400,
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.image}
        alt={product.name}
        sx={{ ...(quantity < 1 && { filter: "brightness(0.3)" }) }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ ...(quantity < 1 && { filter: "brightness(0.3)" }) }}
        >
          {product.name} ({quantity})
        </Typography>
        <Typography variant="h6">{product.price}€</Typography>
      </CardContent>
    </Card>
  );
};

export const Slots = () => {
  const [slots, setSlots] = useState<SlotProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );
  const fetchSlots = async () => {
    try {
      if (!slots) {
        setLoading(true);
      }
      setSlots(await new SlotsRepository().getSlots());
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
    // setInterval(fetchSlots, 5000); // adds concurrency
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
      <Grid container spacing={2}>
        {slots.map((slot, rowIdx) => (
          <Grid item xs={4}>
            <Slot {...slot} fetchSlots={fetchSlots} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
