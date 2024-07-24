import shampayLogo from './assets/logo_shampay.webp'
import './App.css'
import { Transaction } from './components/transaction'
import { useTransactionData } from './hooks/useTransactionData'

function App() {

  const { transactionData } = useTransactionData();

  return (
    <>
      <div className='container'>
        <a href="#" target="_self">
          <img src={shampayLogo} className="logo react responsive-img" alt="Shampay logo" />
        </a>
        <h1>Shampay</h1>
        <table className='striped responsive-table'>
          <thead>
            <tr>
              <th className='center-align'>Date</th>
              <th className='center-align'>Description</th>
              <th className='center-align'>Amount</th>
              <th className='center-align'>Category</th>
              <th className='center-align'>Payment Method</th>
              <th className='center-align'>Shared User</th>
              <th className='center-align'>Shared Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactionData?.map(transactionLine =>
              <Transaction
                key={transactionLine.id}
                date={transactionLine.date}
                description={transactionLine.importedDescription}
                amount={transactionLine.totalAmount}
                category={transactionLine.category}
                paymentMethod={transactionLine.paymentMethod}
                shared={transactionLine.payerUserId}
                sharedAmount={transactionLine.dueAmount}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
