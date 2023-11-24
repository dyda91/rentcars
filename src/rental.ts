import { CustomerModel } from "./customer";
import { VehicleModel } from "./vehicle";

export interface BaseRentalProps {
  customer: CustomerModel;
  vehicle: VehicleModel;
  startDate: Date;
  endDate: Date;
}

export interface RentalProps extends BaseRentalProps {
  id: number;
}

let rentalIdCounter: number = 0;

//export interface RentalMethods {
 // calculateTotalAmount: () => number;
//}

export class RentalModel implements RentalProps {
  public readonly customer: CustomerModel;
  public readonly vehicle: VehicleModel;

  public readonly startDate: Date;
  public readonly endDate: Date;

  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(customer: CustomerModel, vehicle: VehicleModel, startDate: Date, endDate: Date) {
    this.customer = customer;
    this.vehicle = vehicle;

    this.startDate = startDate;
    this.endDate = endDate;

    this.id = ++rentalIdCounter;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

 
}
