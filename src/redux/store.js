import { configureStore } from '@reduxjs/toolkit';

import bookingSlice from "./bookingSlice" 
import customerSlice  from './customerSlice';
import  dashboardLoginSlice  from './dashboardLoginSlice';
import  dashboardSlice  from './dashboardSlice';
import eventSlice from './eventSlice';
import transactionSlice  from './transactionSlice';

export default configureStore({
    reducer: {
        eventSlice: eventSlice,
        bookingSlice:bookingSlice,
        customerSlice: customerSlice,
        transactionSlice: transactionSlice,
        dashboardSlice:dashboardSlice,
        dashboardLoginSlice:dashboardLoginSlice
    }
});
