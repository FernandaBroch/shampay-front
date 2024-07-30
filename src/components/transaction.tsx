import React, { useState, useEffect } from 'react';
interface TransactionProps {
  id: number,
  date: string,
  description: string,
  manualDescription: string,
  amount: number,
  category: string,
  paymentMethod: string,
  shared: number,
  sharedAmount: number,
  originalTransactionId: number
}
export function Transaction({ id, date, description, manualDescription, amount, category, paymentMethod, shared, sharedAmount, originalTransactionId }: TransactionProps) {
  let button;
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    id,
    date,
    description,
    manualDescription,
    category,
    amount,
    this: category,
    paymentMethod,
    shared,
    sharedAmount,
    originalTransactionId
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories');
        let data = await response.json();
        data.unshift(" ")
        setCategories(data);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    manualDescription = transaction.manualDescription
    console.log('Transaction state updated:', transaction);
  }, [transaction]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedTransaction = { ...transaction, [name]: value };
    setTransaction(updatedTransaction); 
    handleResponse(`http://localhost:8080/transactions/${id}`, 'PUT', 'Update transaction', updatedTransaction)
  };

  const handleUnshare = async () => {
    handleResponse(`http://localhost:8080/transactions/unshared/${id}`, 'PUT', 'Unshare Transaction', '')
  }
  
  const handleShare = async () => {
    const data = {
      originalTransactionId: id,
      sharedUserId: 2,
      duePercentage: 0,
      dueAmount: 0
    };
    handleResponse(`http://localhost:8080/transactions/shared/${id}`, 'PUT', 'Share transaction', data)
    
  };

  const handleResponse = async (url: string, method: string, actionName: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(actionName + ' successfully');
      } else {
        alert(actionName + 'failed');
      }
    } catch (error) {
      console.error(actionName + 'Error', error);
      alert(actionName + 'error occurred');
    }
  }

  if (originalTransactionId == id) {
    button = <a onClick={handleUnshare} className="waves-effect waves-light red lighten-2 btn">Unshare</a>;
  } else if (originalTransactionId == null || originalTransactionId == 0) {
    button = <a onClick={handleShare} className="waves-effect waves-light lighten-2 btn">Share</a>;
  }

  return (
    <tr id={id.toString()}>
      <td>{id}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td><input type="text" name="manualDescription" value={transaction.manualDescription} onChange={handleChange} /></td>
      <td>{amount}</td>
      <td className='categorySelect'>
        <select title={category} name="category" value={transaction.category} onChange={handleChange} className="browser-default">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </td>
      <td>{paymentMethod}</td>
      <td>{originalTransactionId}</td>
      <td>{shared}</td>
      <td>{sharedAmount}</td>
      <td>{button}</td>
    </tr>
  )
}