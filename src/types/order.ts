export interface order {
  id?: number;
  status: string;
  products: [id: number, quantity: number];
}
