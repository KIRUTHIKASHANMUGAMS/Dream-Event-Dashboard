import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import config from "../config";

const initialState = {
    createEvent: [],
    eventCategory: [],
    eventList: [],
    eventById:{}
}



export const createEventDetails = (formData) =>
    async (dispatch) => {
        try {
            const response = await axios.post(config.createEvent, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(createEvent({ createEvent: response.data }));
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

export const eventCategoryDetails = () =>

    async (dispatch) => {
        try {
            const response = await axios.get(config.eventCategory);
            dispatch(setContactDetails({ eventCategory: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };

export const eventListDetails = (selectedCategory, calender) =>
    async (dispatch) => {
        const category = {
            'eventCategory': selectedCategory,
            'eventDate': calender,
        }
        try {
            const response = await axios.post(config.eventList, category);
            dispatch(eventList({ eventList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };


    export const eventByIdList = (formData) =>
        async (dispatch) => {
          
            try {
                const response = await axios.get(`${config.eventById}?id=${formData}`);
               dispatch(eventById({ eventById: response.data.data }));
            } catch (error) {
                return error?.response?.data;
            }
        };
    

export const eventSlice = createSlice({
    name: 'eventSlice',
    initialState,
    reducers: {
        createEvent(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setContactDetails(state, action) {
            state.eventCategory = action.payload.eventCategory;
        },
        eventList(state, action) {
            state.eventList = action.payload.eventList;
        },
        eventById(state, action) {
            state.eventById = action.payload.eventById;
        }
    }
})



export const { createEvent, setContactDetails, eventList, eventById } = eventSlice.actions;

export default eventSlice.reducer;
