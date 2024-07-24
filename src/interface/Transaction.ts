export interface Transaction{
  id: number,
  date: string,
  importedDescription: string,
  totalAmount: number,
  category: string,
  paymentMethod: string,
  payerUserId: number,
  dueAmount: number
}