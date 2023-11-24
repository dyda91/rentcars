export enum LicenseTypeEnum {
    A = "A",
    B = "B",
    AB = "AB",
    C = "C",
  }
  
  export type BaseCustomerGenderType = "male" | "female" | "other";
  
  export interface BaseCustomerProps {
    name: string;
    cpf: string;
    licenseType: LicenseTypeEnum;
  }
  
  export interface CustomerProps extends BaseCustomerProps {
    id: number;
  }
  
  let customerIdCounter: number = 0;
  
  export class CustomerModel implements CustomerProps {
    public readonly name: string;
    public readonly cpf: string;
    public readonly licenseType: LicenseTypeEnum;
  
    public readonly id: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
  
    constructor(data: BaseCustomerProps) {
      this.id = ++customerIdCounter;
      this.name = data.name;
      this.cpf = data.cpf;
      this.licenseType = data.licenseType;
  
      this.createdAt = new Date();
      this.updatedAt = this.createdAt;
    }
  }
  