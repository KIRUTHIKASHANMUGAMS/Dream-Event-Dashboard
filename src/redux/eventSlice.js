import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import config from "../config";

const initialState = {
    createEvent: [],
    editEvent:[],
    createEventById:[],
    eventCategory: [],
    eventList: [],
    eventById:{},
    eventStatus:[],
    deleteEvent:[]
}


export const createEventDetails = createAsyncThunk(
    'event/createEventDetails',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.createEvent, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
         
            return response.data;
        } catch (error) {
         
            return rejectWithValue(error?.response?.data);
        }
    }
);

    //edit Event

    export const editcreateEventDetails = createAsyncThunk(
        'event/editcreateEventDetails',
        async ({ id, formData }, { rejectWithValue }) => {
            const url = `${config.createEvent}/${id}`;
            try {
                const response = await axios.put(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            
                return response.data;
            } catch (error) {
               
                return rejectWithValue(error?.response?.data);
            }
        }
    );


    export const CreateEventById = (id) =>

        async (dispatch) => {
            const url = `${config.createEvent}/${id}`;

            try {
                const response = await axios.get(url);
                dispatch(createEventById({ createEventById: response.data.data }));
            } catch (error) {
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


    export const eventStatusList = () =>
        async (dispatch) => {
          
            try {
                const response = await axios.get(config.eventStatus);
               dispatch(eventStatus({ eventStatus: response.data.data }));
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
        

            
//delete
export const deleteEventSliceDetails = createAsyncThunk(
    'event/deleteEventSliceDetails',
    async (roleId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${config.createEvent}/${roleId}`);
            toast.success("Event Deleted Successfully!", {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
            return response.data.data; // Return the deleted event data if needed
        } catch (error) {
            toast.error((error?.response?.data?.message), {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
            return rejectWithValue(error?.response?.data); // Use rejectWithValue for error handling
        }
    }
);
    

export const eventSlice = createSlice({
    name: 'eventSlice',
    initialState,
    reducers: {
        createEvent(state, action) {
            state.createEvent = action.payload.createEvent; // Update state with the new event
        },
        setContactDetails(state, action) {
            state.eventCategory = action.payload.eventCategory;
        },
        eventList(state, action) {
            state.eventList = action.payload.eventList;
        },
        eventById(state, action) {
            state.eventById = action.payload.eventById;
        },
        eventStatus(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        editEvent(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        createEventById(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        deleteEvent(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
     
        extraReducers: (builder) => {
            builder
                .addCase(createEventDetails.fulfilled, (state, action) => {
                    state.createEvent = action.payload; // Set the createEvent state to the response
                })
                .addCase(createEventDetails.rejected, (state, action) => {
                    console.error('Error creating event:', action.payload);
                    toast.error(action.payload.message);
                })
                .addCase(editcreateEventDetails.fulfilled, (state, action) => {
                    state.editEvent = action.payload; // Update the editEvent state
                })
                .addCase(editcreateEventDetails.rejected, (state, action) => {
                    console.error('Error editing event:', action.payload);
                    toast.error(action.payload.message);
                });
        }
    }
})



export const { createEvent, setContactDetails, eventList, eventById,eventStatus ,deleteEvent,editEvent ,createEventById} = eventSlice.actions;

export default eventSlice.reducer;
