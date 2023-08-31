import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

interface POSProps {
  customerName: string;
  balance: number;
}

interface POSInputAmountProps {
  amount: number;
}

export const InputAmount = ({ amount }: POSInputAmountProps) => {
  return (
    <Grid item xs={4} sx={{ paddingY: 4, textAlign: "center" }}>
      {amount} €
    </Grid>
  );
};

export const PointOfSale = ({ customerName, balance }: POSProps) => {
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
          Saldo actual {balance} €
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button>Refund money</Button>
      </Box>
    </Box>
  );
};
