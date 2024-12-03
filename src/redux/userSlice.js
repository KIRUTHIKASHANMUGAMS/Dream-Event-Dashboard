import {
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import config from "../config";


const initialState = {
  createUserList:[]
}

export const createUserListDetails = (formValues) =>

    async (dispatch) => {
        try {
            const response = await axios.post(config.createUser , formValues);
            dispatch(createUserList({ createUserList: response.data }));
            toast.success("User created successfully!", {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
        } catch (error) {
            console.log(error.message)
            toast.error((error?.response?.data?.message), {
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

    export const createUserSlice = createSlice({
        name: 'userSlice',
        initialState,
        reducers: {
            createUserList(state, action) {
                return {
                    ...state,
                    ...action.payload
                }
            },
           
        }
    })
    
    
    
    export const { createUserList } = createUserSlice.actions;
    
    export default createUserSlice.reducer;
    