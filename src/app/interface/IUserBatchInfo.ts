export interface IUserBatchInfo {
    batchId: number,
    planPurchaseDate: Date,
    planExpiryDate: Date,
    batchName: string,
    batchTime: string,
    paid: number,
    dueAmount: number
  }