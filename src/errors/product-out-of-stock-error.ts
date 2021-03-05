import { CustomError } from "./custom-error";

export class ProductOutOfStockError extends CustomError {
  statusCode = 400;

  constructor(private products: { id: string; stock: number }[]) {
    super("Products out of stock");
    Object.setPrototypeOf(this, ProductOutOfStockError.prototype);
  }

  serializeErrors() {
    return [
      { message: "some products are out of stock", products: this.products },
    ];
  }
}
