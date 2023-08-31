import { FC } from "react";
import { Navigate } from "react-router";
import { Products } from "../components/Product";
import { Box, Grid } from "@mui/material";
import { PointOfSale } from "../components/PointOfSaleTerminal";

export const VendingMachine: FC = () => {
  const user = true; // TODO connect to the redux store and retrieve the user name

  if (!user) {
    return <Navigate to="/" />;
  }

  // user is logged in
  // return <Products />
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Products></Products>
      </Grid>
      <Grid item xs={12} md={4}>
        <PointOfSale customerName={"Jan"} balance={2.48}></PointOfSale>
      </Grid>
    </Grid>
  );
};
