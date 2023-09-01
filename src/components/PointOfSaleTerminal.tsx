import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateBalance } from "../slice";
import { useCallback } from "react";

interface POSProps {
  customerName: string;
  balance: number;
}

interface POSInputAmountProps {
  amount: number;
}

export const InputAmount = ({ amount }: POSInputAmountProps) => {
  const dispatch = useDispatch();

  const handleOnClick = useCallback(
    (balance: number) => {
      dispatch(updateBalance(balance));
    },
    [dispatch]
  );
  return (
    <Grid item xs={4} sx={{ paddingY: 4, textAlign: "center" }}>
      <Button onClick={() => handleOnClick(amount)}>
        {amount.toFixed(2)} €
      </Button>
    </Grid>
  );
};

export const PointOfSale = () => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );
  const dispatch = useDispatch();
  const handleRefund = useCallback(() => {
    dispatch(updateBalance(null));
  }, [dispatch]);

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
          <InputAmount amount={0.1}></InputAmount>
          <InputAmount amount={0.2}></InputAmount>
          <InputAmount amount={0.5}></InputAmount>
          <InputAmount amount={1}></InputAmount>
          <InputAmount amount={2}></InputAmount>
          <InputAmount amount={5}></InputAmount>
        </Grid>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontSize: 20 }}>
          Saldo actual {balance.toFixed(2)} €
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button onClick={() => handleRefund()}>Refund money</Button>
      </Box>
    </Box>
  );
};
