import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

const initialState = {
    dashboardList: [],
    totalEventDashboard: [],
    totalTicketDashboard: [],
    salesRevenue: [],
    upcomingList:[]
}

export const fetchTransactionList = () =>

    async (dispatch) => {

        try {
            const response = await axios.get(config.dashboardList);
            dispatch(dashboardList({ dashboardList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };


export const totalEventDashboardList = (selectedCategory, date) =>

    async (dispatch) => {
        const category = {
            'category': selectedCategory,
            'date': date,
        }
        try {
            const response = await axios.post(config.totalEventDashboard, category);
            dispatch(totalEventDashboard({ totalEventDashboard: response.data }));
         

        } catch (error) {
            return error?.response?.data;
        }
    };



export const totalTicketDashboardList = (selectedCategory, date) =>
    
    async (dispatch) => {
        const category = {
            'category': selectedCategory,
            'date': date,
        }
        try {
            const response = await axios.post(config.totalEventDashboard, category);
            dispatch(totalTicketDashboard({ totalTicketDashboard: response.data }));
         

        } catch (error) {
            return error?.response?.data;
        }
    };


export const salesRevenueList = (date) =>

    async (dispatch) => {

        const dates={
            date:date
        }
      
        try {
            const response = await axios.post(config.salesRevenue ,dates);
            dispatch(salesRevenue({ salesRevenue: response.data.totalRevenue }));
    

        } catch (error) {
            return error?.response?.data;
        }
    };


    export const upcomingEventList = (date) =>


        async (dispatch) => {
    
            const dates={
                date:date
            }
       
            try {
                const response = await axios.post(config.upcomingList ,dates);
                dispatch(upcomingList({ upcomingList: response.data.data }));
          
    
            } catch (error) {
                return error?.response?.data;
            }
        };

export const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        dashboardList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },

        totalEventDashboard(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        totalTicketDashboard(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        salesRevenue(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        upcomingList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },

    }
})



export const { dashboardList, totalEventDashboard, totalTicketDashboard , salesRevenue ,upcomingList} = dashboardSlice.actions;

export default dashboardSlice.reducer;
