import * as readline from 'readline';
import { RentalCarsSystem } from "./system";
import { LicenseTypeEnum, CustomerModel } from "./customer";
import { VehicleModel } from './vehicle';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false 
});

function carInputs(): Promise<any> {
  return new Promise((resolve) => {
    rl.question('Informe a placa do carro: ', (plate) => {
      rl.question('Informe a marca do carro: ', (brand) => {
        rl.question('Informe o modelo do carro: ', (model) => {
          rl.question('Informe o ano de fabricação do carro: ', (manufacturingYear) => {
            rl.question('Informe a cor do carro: ', (color) => {
              rl.question('Informe a taxa de aluguel por hora: ', (hourlyRentalRate) => {
                resolve({
                  plate,
                  brand,
                  model,
                  manufacturingYear: parseInt(manufacturingYear),
                  color,
                  available: true,
                  hourlyRentalRate: parseFloat(hourlyRentalRate),
                  vehicleType: 'car' // Especificando que é um carro
                });
              });
            });
          });
        });
      });
    });
  });
}

function customerInputs(): Promise<any> {
  return new Promise((resolve) => {
    rl.question('Informe o nome do cliente: ', (name) => {
        rl.question('Informe o telefone do cliente: ', (cpf) => {
          rl.question(`Escolha o tipo de licença (${Object.values(LicenseTypeEnum).join(', ')}): `, (licenseTypeInput) => {
            const licenseType = licenseTypeInput.toUpperCase(); 
            if (Object.values(LicenseTypeEnum).includes(licenseType as LicenseTypeEnum)) {
              resolve({
                name,
                cpf,
                licenseType 
              });
            } else {
              console.error('Tipo de licença inválido. Encerrando...');
              rl.close(); 
            }
          });
        });
      
    });
  });
}

async function addVehicle(rentalSystem: RentalCarsSystem) {
  const carData = await carInputs();

  if (rentalSystem.isPlateUsed(carData.plate)) {
    console.log('Veículo com placa já cadastrada. Não foi possível adicionar o carro.');
    showMenu(rentalSystem);
    return;
  }

  try {
    await rentalSystem.addCar(carData);
    console.log("Carro adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar carro:", error.message);
  }
}
async function addCustomer() {
  const customerData = await addCustomerInput();

  try {
    console.log("Cliente adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
  }
}
async function addCustomerInput() {
  const customerData = await customerInputs();

  const newCustomer = new CustomerModel({
    name: customerData.name,
    cpf: customerData.cpf,
    licenseType: customerData.licenseType,
  });

  try {
    rentalSystem.addCustomer(newCustomer);
    console.log("Cliente adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
  }
}

async function askForOption(question: string): Promise<number> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      const option = parseInt(answer);
      resolve(option);
    });
  });
}


async function askForDate(question: string): Promise<Date> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      const [day, month, year] = answer.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      resolve(date);
    });
  });
}

  


async function rentalMenu(rentalSystem: RentalCarsSystem) {
  console.log('Opção 4 - Alugar\n');
  console.log('Escolha o tipo de veículo:');
  console.log('1 - Carro');
  console.log('2 - Moto');
  console.log('3 - Voltar');

  const choice = await askForOption('Escolha uma opção: ');

  if (choice === 1 || choice === 2) {
    let availableVehicles: VehicleModel[] = [];
    if (choice === 1) {
      availableVehicles = rentalSystem.cars.filter((car) => car.available);
    } else if (choice === 2) {
      availableVehicles = rentalSystem.motorcycles.filter((motorcycle) => motorcycle.available);
    }

    if (availableVehicles.length === 0) {
      console.log('Nenhum veículo disponível para aluguel.');
    } else {
      console.log('\nVeículos disponíveis:');
      availableVehicles.forEach((vehicle, index) => {
        console.log(`${index + 1} - ${vehicle.brand} ${vehicle.model} (${vehicle.plate})`);
      });

      console.log(`${availableVehicles.length + 1} - Voltar`);

      const selectedVehicleIndex = await askForOption('Escolha o veículo para alugar: ');

      if (selectedVehicleIndex === availableVehicles.length + 1) {
        rentalMenu(rentalSystem); 
      } else if (selectedVehicleIndex > 0 && selectedVehicleIndex <= availableVehicles.length) {
        const selectedVehicle = availableVehicles[selectedVehicleIndex - 1];
        console.log(`Veículo escolhido: ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.plate})\n`);

        const startDate = await askForDate('Digite a data de início (DD/MM/YYYY): ');
        const endDate = await askForDate('Digite a data de término (DD/MM/YYY): ');

        console.log(`Data de início: ${startDate.toISOString()}`);
        console.log(`Data de término: ${endDate.toISOString()}`);

      } else {
        console.log('Opção inválida!');
      }
    }
  } else if (choice === 3) {
    showMenu(rentalSystem);
  } else {
    console.log('Opção inválida!');
  }
}


async function showMenu(rentalSystem: RentalCarsSystem) {
  rl.question(
    'Escolha o que deseja fazer:\n 1 - Adicionar Veículo\n 2 - Adicionar Cliente\n 3 - Listar Carros\n 4 - Alugar\n 5 - Listar Aluguéis Abertos\n',
    async (option) => {
      if (option === '1') {
        await addVehicle(rentalSystem);
        showMenu(rentalSystem);
      } else if (option === '2') {
        await addCustomer();
        showMenu(rentalSystem);
      } else if (option === '3') {
        rentalSystem.listAllCars();
        showMenu(rentalSystem);
      } else if (option === '4') {
        await rentalMenu(rentalSystem);
        showMenu(rentalSystem);
      } else if (option === '5') {
        rentalSystem.printOpenRentalsList();
        showMenu(rentalSystem);
      } else {
        console.error('Opção inválida. Encerrando...');
        rl.close();
      }
    }
  );
}

const rentalSystem = new RentalCarsSystem();
showMenu(rentalSystem);