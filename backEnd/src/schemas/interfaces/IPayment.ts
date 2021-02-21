export interface IPayment {
    id?: number;
    paymentStatus: string;
    transactionId: string;
    payerId: number;
    userId?: number;
}