import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateBalance } from "../../slice";
import { useState } from "react";
import POSTerminalRepository from "./Repositories";

export const PointOfSale = () => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleBalanceChange = async (amount: number | null) => {
    if (!customerName) {
      return;
    }
    try {
      let newBalance = 0;
      if (amount != null) {
        newBalance = balance + amount;
      }
      await new POSTerminalRepository().updateWallet(newBalance, customerName);
      dispatch(updateBalance(newBalance));
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <Typography variant="h1" sx={{ fontSize: 40 }}>
          Bones {customerName}!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2" sx={{ fontSize: 30 }}>
          afegeix calers:
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {[0.1, 0.2, 0.5, 1, 2, 5].map((amount, idx) => (
            <Grid item xs={4} sx={{ paddingY: 4, textAlign: "center" }}>
              <Box
                component="img"
                sx={{
                  maxWidth: "70%",
                }}
                src={
                  "https://w7.pngwing.com/pngs/628/714/png-transparent-super-mario-coin-illustration-super-mario-bros-super-mario-world-minecraft-coin-stack-angle-heroes-super-mario-bros.png"
                }
              ></Box>
              <Button onClick={() => handleBalanceChange(amount)}>
                {amount.toFixed(2)} €
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontSize: 20 }}>
          Saldo actual {balance.toFixed(2)} €
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button onClick={() => handleBalanceChange(null)}>Refund money</Button>
      </Box>
    </Box>
  );
};
