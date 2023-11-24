import { CustomerModel } from "./customer";
import { RentalModel } from "./rental";

export interface BaseInvoiceProps {
  customer: CustomerModel;
}

export interface InvoiceProps {
  id: number;
  rentals: RentalModel[];
  expiresAt: Date;
  state: "payed" | "opened" | "canceled" | "expired";
}

let invoiceIdCounter: number = 0;

export interface InvoiceMethods {}

export class InvoiceModel implements InvoiceProps, InvoiceMethods {
  public readonly customer: CustomerModel;
  public readonly rentals: RentalModel[];

  public expiresAt: Date;
  public state: "payed" | "opened" | "canceled" | "expired";

  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(customer: CustomerModel, rentals: RentalModel[], expiresAt: Date) {
    this.customer = customer;
    this.rentals = rentals;

    this.state = "opened";
    this.expiresAt = expiresAt;

    this.id = ++invoiceIdCounter;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}
