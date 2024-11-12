import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import config from "../config";

const initialState = {
    dashboardLoginList: []
}


export const dashboardLoginListDetails = (details) =>

    async (dispatch) => {

        try {
            const response = await axios.post(config.dashboardlogin, details);
            dispatch(dashboardLoginList({ dashboardLoginList: response.data }));
        
            toast.success("Event created successfully!", {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
        
        } catch (error) {

            toast.error((error?.response?.data?.message || "Unknown error"), {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
            return error?.response?.data;

        }
    };

export const dashboardLoginSlice = createSlice({
    name: 'dashboardLoginSlice',
    initialState,
    reducers: {
        dashboardLoginList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },

    }
})



export const { dashboardLoginList } = dashboardLoginSlice.actions;

export default dashboardLoginSlice.reducer;
