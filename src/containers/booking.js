import React, { useState} from 'react';

import BookingEvent from "../components/booking/bookingEvent"
import BookingHead from "../components/booking/bookingHead";

function booking() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date,setDate]=useState('')

  return (
    <div>
        <BookingHead  setSelectedCategory={setSelectedCategory}  setDate={setDate}/>
        <BookingEvent  selectedCategory={selectedCategory}  date={date}/>
      
    </div>
  )
}

export default booking
