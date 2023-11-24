export enum VehicleTypeEnum {
  CAR = "car",
  MOTORCYCLE = "motorcycle",
}

export interface BaseVehicleProps {
  plate: string;
  brand: string;
  model: string;
  manufacturingYear: number;
  color: string;
  available: boolean;
  hourlyRentalRate: number;
  vehicleType: VehicleTypeEnum;
}

let vehicleIdCounter: number = 0;

export interface VehicleModelProps extends BaseVehicleProps {
  id: number;
}

export interface VehicleModelMethods {}

export class VehicleModel implements VehicleModelProps, VehicleModelMethods {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public readonly plate: string;
  public readonly brand: string;
  public readonly model: string;
  public readonly manufacturingYear: number;
  public readonly color: string;

  public available: boolean;
  public readonly hourlyRentalRate: number;
  public readonly vehicleType: VehicleTypeEnum;

  constructor(props: BaseVehicleProps) {
    this.plate = props.plate;
    this.brand = props.brand;
    this.model = props.model;
    this.manufacturingYear = props.manufacturingYear;
    this.color = props.color;
    this.available = props.available;
    this.hourlyRentalRate = props.hourlyRentalRate;
    this.vehicleType = props.vehicleType;

    this.id = ++vehicleIdCounter;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

export class Car extends VehicleModel {
  constructor(props: BaseVehicleProps) {
    super({
      ...props,
      available: true,
      vehicleType: VehicleTypeEnum.CAR,
    });
  }
}

export class Motorcycle extends VehicleModel {
  constructor(props: BaseVehicleProps) {
    super({
      ...props,
      available: true,
      vehicleType: VehicleTypeEnum.MOTORCYCLE,
    });
  }
}
