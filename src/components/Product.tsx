import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

interface ProductProps {
  title: string;
  price: number;
}

export const Product = ({ title, price }: ProductProps) => {
  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontSize: 30 }}>
        {title}
      </Typography>
      <Box>{price}€</Box>
      <Button>Buy</Button>
    </Box>
  );
};

export const Products = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: 40 }}>
        Productes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Product title="Pastís de formatge" price={5} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Carrot cake" price={5} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Recuit de fonteta" price={5} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Crema catalana" price={5} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Valencià" price={3} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Bisbalenc" price={3} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Xuixo de crema" price={3} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Catànies" price={3} />
        </Grid>
        <Grid item xs={4}>
          <Product title="Panellets" price={3} />
        </Grid>
      </Grid>
    </Box>
  );
};

// Now we can show our products list inside the VendingMachine page
export const VendingMachine = () => {
  return <Products />;
};
