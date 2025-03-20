import { Time } from "@angular/common";

export interface IMember {
  id: number;
  name: string;
  photo: string;
  phone: string;
  gender: string;
  address: string;
  batchName: string;
  batchTime: {
    startTime:string;
    endTime:string;
  };
  trainingType: string;
  package: {
    plan: string;
    totalAmount: number;
    discount: number;
    purchaseDate: Date;
    planExpiryDate: Date;
    paid: number;
    dueAmount: number;
    daysRemaining: number;
  };
}
