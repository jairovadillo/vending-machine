import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

export interface ProductProps {
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

export const Products = ({ products }: { products: Array<ProductProps> }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: 40 }}>
        Productes
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={4}>
            <Product title={product.title} price={product.price} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
