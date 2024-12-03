import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

const initialState = {
    transactionList:[]
}

export const fetchTransactionList = (selectedCategory ,date) =>

    async (dispatch) => {
        const category={
            'eventCategory':selectedCategory,
            'eventDate':date
        }
        try {
            const response = await axios.post(config.transactionList , category);
            dispatch(transactionList({ transactionList: response.data.data }));
            console.log(response.data)
        } catch (error) {
            return error?.response?.data;
        }
    };

    export const transactionSlice = createSlice({
        name: 'transactionSlice',
        initialState,
        reducers: {
            transactionList(state, action) {
                return {
                    ...state,
                    ...action.payload
                }
            },
           
        }
    })
    
    
    
    export const { transactionList } = transactionSlice.actions;
    
    export default transactionSlice.reducer;
    