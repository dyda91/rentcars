import { VehicleModel, VehicleTypeEnum } from "./vehicle";
import { CustomerModel } from "./customer";
import { RentalModel } from "./rental";

export class RentalCarsSystem {
  public cars: VehicleModel[] = [];
  public motorcycles: VehicleModel[] = [];
  private customers: CustomerModel[] = [];
  private rentals: RentalModel[] = []; 

  isPlateUsed(plate: string): boolean {
    const allPlates = this.cars.map(car => car.plate);
    return allPlates.includes(plate);
  }

  async addCar(props: any): Promise<void> {
    const car = new VehicleModel({
      ...props,
      available: true,
      vehicleType: VehicleTypeEnum.CAR,
    });
    
    
    this.cars.push(car);

    console.log(`Carro adicionado com sucesso! ID do carro: ${car.id}`);
  }
  async addMotorcycle(props: any): Promise<void> {
    const motorcycle = new VehicleModel({
      ...props,
      available: true,
      vehicleType: VehicleTypeEnum.MOTORCYCLE,
    });
    this.motorcycles.push(motorcycle);
  }

  addCustomer(customer: CustomerModel): void {
    this.customers.push(customer);
    console.log(`Cliente adicionado com sucesso! ID do cliente: ${customer.id}`);
  }

  getAllCustomers(): CustomerModel[] {
    return this.customers;
  }

  listAllCars(): void {
    console.log("Lista de carros disponíveis:");

    if (this.cars.length === 0) {
      console.log("Nenhum carro disponível no momento.");
      return;
    }

    console.log(
      "------------------------------------------------------------------------------------------------"
    );
    console.log(
      "|   ID   |  Placa    |   Marca   |   Modelo  | Ano Fabr. |   Cor    | Aluguel/Hora | Disponível |"
    );
    console.log(
      "------------------------------------------------------------------------------------------------"
    );

    this.cars.forEach((car) => {
      const {
        id,
        plate,
        brand,
        model,
        manufacturingYear,
        color,
        hourlyRentalRate,
        available,
      } = car;

      console.log(
        `| ${id} | ${plate} | ${brand} | ${model} | ${manufacturingYear} | ${color} | ${hourlyRentalRate} | ${available ? "Sim" : "Não"} |`
      );
    });

    console.log(
      "------------------------------------------------------------------------------------------------"
    );
  }

  async rental(customerId: number, vehicleId: number, startDate: Date, endDate: Date): Promise<void> {
    const customer = this.customers.find((customer) => customer.id === customerId);
    const vehicle = this.cars.concat(this.motorcycles).find((vehicle) => vehicle.id === vehicleId);

    if (!customer || !vehicle) {
      console.log("Cliente ou veículo não encontrado.");
      return;
    }

    if (!vehicle.available) {
      console.log("Veículo não está disponível para aluguel no momento.");
      return;
    }

    const rental = new RentalModel(customer, vehicle, startDate, endDate);
    this.rentals.push(rental);

    vehicle.available = false; 

    console.log(`Veículo alugado com sucesso para ${customer.name}.`);
  }

  getOpenRentals(): RentalModel[] {
    return this.rentals.filter((rental) => rental.endDate === null);
  }

  printOpenRentalsList(): void {
    const openRentals = this.getOpenRentals();

    console.log("Lista de Aluguéis Abertos:");
    if (openRentals.length === 0) {
      console.log("Nenhum aluguel em aberto no momento.");
      return;
    }

    openRentals.forEach((rental, index) => {
      console.log(`${index + 1} - Cliente: ${rental.customer.name}, Veículo: ${rental.vehicle.brand} ${rental.vehicle.model} (${rental.vehicle.plate})`);
    });
  }

 
}
