import { Grid } from "@mui/material";
import { FC } from "react";
import { Slots } from "../packages/slots/Components";
import { PointOfSale } from "../packages/pointOfSaleTerminal/Components";

export const VendingMachine: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Slots></Slots>
      </Grid>
      <Grid item xs={12} md={4}>
        <PointOfSale></PointOfSale>
      </Grid>
    </Grid>
  );
};
