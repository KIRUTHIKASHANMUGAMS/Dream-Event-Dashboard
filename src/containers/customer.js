import React , {useState} from 'react';
import { Container } from 'react-bootstrap';

import CustomerEvent from "../components/customer/customerEvent"
import CustomerTable from "../components/customer/customerHead";

function customer() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date,setDate]=useState('')

  return (
    <div>
        <Container fluid>
            <CustomerTable setSelectedCategory={setSelectedCategory}  setDate={setDate}/>
            <CustomerEvent  selectedCategory={selectedCategory}  date={date}/>

        </Container>
      
    </div>
  )
}

export default customer
