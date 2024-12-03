import { configureStore } from '@reduxjs/toolkit';

import bookingSlice from "./bookingSlice" 
import customerSlice  from './customerSlice';
import  dashboardSlice  from './dashboardSlice';
import eventSlice from './eventSlice';
import rolePermission from "./rolePermission"
import transactionSlice  from './transactionSlice';
import userSlice from "./userSlice"

export default configureStore({
    reducer: {
        eventSlice: eventSlice,
        bookingSlice:bookingSlice,
        customerSlice: customerSlice,
        transactionSlice: transactionSlice,
        dashboardSlice:dashboardSlice,
        rolePermission:rolePermission,
        userSlice:userSlice
    }
});
