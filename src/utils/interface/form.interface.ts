export interface IProduct {
  id: number;
  productName?: string;
  productQuantity?: number;
  productPrice?: number;
  totalPrice?: number;
}

export interface IFormData {
  customerName: string;
  customerMobileNumber: string;
  customerAddress: string;
  billingDate: string;
  products: IProduct[];
}
