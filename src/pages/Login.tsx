import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../store";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import { updateCustomerName } from "../slice";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const handleUpdateCustomerName = useCallback(
    (customerName: string) => {
      dispatch(updateCustomerName(customerName));
    },
    [dispatch]
  );
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customerName: any = data.get("customerName");

    if (customerName) {
      dispatch(updateCustomerName(customerName));
    }
  };

  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );

  if (customerName) {
    return <Navigate to="/vending-machine" />;
  }

  return (
    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
      <Typography variant="h1" sx={{ fontSize: 40, padding: 2 }}>
        Catalan desserts vending machine
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="customerName"
        label="Name"
        name="customerName"
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};
