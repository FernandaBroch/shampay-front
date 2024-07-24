interface TransactionProps {
  date: string,
  description: string,
  amount: number,
  category: string,
  paymentMethod: string,
  shared: number,
  sharedAmount: number
  
}
export function Transaction({date, description, amount, category, paymentMethod, shared, sharedAmount}: TransactionProps) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{amount}</td>
      <td>{category}</td>
      <td>{paymentMethod}</td>
      <td>{shared}</td>
      <td>{sharedAmount}</td>
    </tr>
  )
}