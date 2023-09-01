import { FC, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { ProductProps, Products } from "../components/Product";
import { Box, CircularProgress, Grid } from "@mui/material";
import { PointOfSale } from "../components/PointOfSaleTerminal";
import { api } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const VendingMachine: FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response: any = await api.getProducts();
        const products: ProductProps[] = response.data;
        setProducts(products);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Products products={products}></Products>
      </Grid>
      <Grid item xs={12} md={4}>
        <PointOfSale></PointOfSale>
      </Grid>
    </Grid>
  );
};
