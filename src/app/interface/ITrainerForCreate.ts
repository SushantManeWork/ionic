export interface ITrainerForCreate {
    trainerId: number;
    name: string;
    password: string;
    photo: string;
    phone: string;
    gender: string;
    address: string;
    trainingTypes:number[];
}