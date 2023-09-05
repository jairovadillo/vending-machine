export interface ProductProps {
  name: string;
  price: number;
  image?: string;
}

export interface SlotProps {
  id: string;
  product: ProductProps;
  quantity: number;
}
