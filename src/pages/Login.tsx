import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../store";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import { updateBalance, updateCustomerName } from "../slice";
import { api } from "../api";

interface CustomerProps {
  name: string;
  credit: number;
  created_at: string;
  last_login: string;
}

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const customerName = useSelector(
    (state: RootState) => state.vendingMachine.name
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setLoading(true);
      const customerName: any = data.get("customerName");
      const response: any = await api.signIn(customerName);
      const customer: CustomerProps = response.data;
      dispatch(updateCustomerName(customer.name));
      dispatch(updateBalance(customer.credit));
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (customerName) {
    return <Navigate to="/vending-machine" />;
  }

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ fontSize: 40, padding: 2, textAlign: "center" }}
      >
        Catalan desserts vending machine
      </Typography>
      <Grid container justifyContent="center" padding={2} marginTop={5}>
        <Grid
          item
          xs={12}
          sm={5}
          justifyContent="center"
          alignItems="center"
          onSubmit={handleSubmit}
          component="form"
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="customerName"
            label="Name"
            name="customerName"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
