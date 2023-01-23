import { Product } from './product';

export interface CartItem {
  quantity: number;
  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  category: any;
}
