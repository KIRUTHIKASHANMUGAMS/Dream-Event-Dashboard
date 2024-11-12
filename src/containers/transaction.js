import React , {useState} from 'react';
import { Container } from 'react-bootstrap';

import Transaction from "../components/transaction/transaction"
import TransactionHead from "../components/transaction/transactionHead";

function transaction() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date,setDate]=useState('')

  return (
    <div>
        <Container fluid>
            <TransactionHead setSelectedCategory={setSelectedCategory} setDate={setDate} />
            <Transaction  selectedCategory={selectedCategory}  date={date} />


        </Container>
      
    </div>
  )
}

export default transaction
