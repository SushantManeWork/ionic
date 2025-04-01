import { ITrainingType } from "./ITrainingType";

export interface ITrainer {
    trainerId: number;
    name: string;
    password: string;
    photo: string;
    phone: string;
    gender: string;
    address: string;
    trainingTypes:ITrainingType[];
}