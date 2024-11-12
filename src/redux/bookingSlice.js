import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

const initialState = {
  bookingList:[]
}

export const bookingListDetails = (selectedCategory,date) =>

    async (dispatch) => {
        const category={
            'date':date,
            'eventCategory':selectedCategory
        }
        try {
            const response = await axios.post(config.bookingList , category);
            dispatch(bookingList({ bookingList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };

    export const bookingSlice = createSlice({
        name: 'bookingSlice',
        initialState,
        reducers: {
            bookingList(state, action) {
                return {
                    ...state,
                    ...action.payload
                }
            },
           
        }
    })
    
    
    
    export const { bookingList } = bookingSlice.actions;
    
    export default bookingSlice.reducer;
    