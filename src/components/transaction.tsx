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
export function Transaction({id, date, description, manualDescription, amount, category, paymentMethod, shared, sharedAmount, originalTransactionId}: TransactionProps) {
  let button;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [transaction, setTransaction] = useState({
    id,
    manualDescription,
    category
  });

  if(selectedCategory == null){
    setSelectedCategory(" ")
  }

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

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
    setTransaction({ ...transaction, category: event.target.value });
  };

  const handleUnshare = async () => {
    try {
      const response = await fetch(`http://localhost:8080/transactions/unshared/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Transaction unshared successfully');
      } else {
        alert('Failed to unshare transaction');
      }
    } catch (error) {
      console.error('Error unsharing transaction:', error);
      alert('An error occurred while unsharing the transaction');
    }
  }
  const handleShare = async () => {
    const data = {
      originalTransactionId: id,
      sharedUserId: 2,  
      duePercentage: 0, 
      dueAmount: 0      
    };

    try {
      const response = await fetch(`http://localhost:8080/transactions/shared/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Transaction shared successfully');
      } else {
        alert('Failed to share transaction');
      }
    } catch (error) {
      console.error('Error sharing transaction:', error);
      alert('An error occurred while sharing the transaction');
    }
  };
  const handleUpdate = async () => {
    console.log(transaction)
    try {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      if (response.ok) {
        alert('Transaction updated successfully');
      } else {
        alert('Failed to update transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('An error occurred while updating the transaction');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
    console.log({transaction})
  };

  if (originalTransactionId == id ) {
    button = <a onClick={handleUnshare} className="waves-effect waves-light red lighten-2 btn">Unshare</a>;
  } else if(originalTransactionId == null || originalTransactionId == 0) {
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
        <select title={category} name="category" value={selectedCategory} onChange={handleCategoryChange} className="browser-default">
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
      <td><button className="waves-effect waves-light yellow darken-2 btn" onClick={handleUpdate}>Update</button></td>
    </tr>
  )
}