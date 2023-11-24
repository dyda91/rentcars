import { BaseVehicleProps, VehicleModel, VehicleTypeEnum } from "./vehicle";

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
