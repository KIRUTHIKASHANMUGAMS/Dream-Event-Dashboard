import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

const initialState = {
  customerList:[]
}

export const customerListDetails = (selectedCategory,date) =>

    async (dispatch) => {
        const category={
            'date':date,
            'eventCategory':selectedCategory
        }
        try {
            const response = await axios.post(config.customerList , category);
            dispatch(customerList({ customerList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };

    export const customerSlice = createSlice({
        name: 'customerSlice',
        initialState,
        reducers: {
            customerList(state, action) {
                return {
                    ...state,
                    ...action.payload
                }
            },
           
        }
    })
    
    
    
    export const { customerList } = customerSlice.actions;
    
    export default customerSlice.reducer;
    