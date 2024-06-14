export interface order {
  id?: number;
  status: string;
  date?: Date;
  totalCost?: number;
  products: [id: number, quantity: number];
}
