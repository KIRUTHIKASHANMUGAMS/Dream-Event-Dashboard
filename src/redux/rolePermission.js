import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { toast } from 'react-toastify';

import config from "../config";

const initialState = {
    rolePermissonCreate: [],
    roleList: [],
    featuresList: [],
    permissionList: [],
    createRole: [],
    rolePermissionList: [],
    editRolePermission: [],
    permissionListById: [],
    deleteRolePermissionList: []


}



//create
export const rolePermissionDetails = createAsyncThunk(
    'rolePermission/create',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.rolePermission, data);
            return response.data; // Return the response data
        } catch (error) {
            return rejectWithValue(error.response.data); // Reject with error data
        }
    }
);


//edit
export const editRoleList = createAsyncThunk(
    'rolePermission/edit',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(config.rolePermission, data);
            return response.data; // Return the response data
        } catch (error) {
            return rejectWithValue(error.response.data); // Reject with error data
        }
    }
);


//create role
export const createRoleList = (data) =>

    async (dispatch) => {

        const details = {
            "roleName": data
        }

        try {
            const response = await axios.post(config.roleCreate, details);
            dispatch(createRole({ createRole: response.data.data }));
            toast.success("Role created Successfully!", {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
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
            return error?.response?.data;
        }
    };

//list the role permission

export const rolePermissionListDetails = () =>

    async (dispatch) => {

        try {
            const response = await axios.get(config.rolePermission);
            dispatch(rolePermissionList({ rolePermissionList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };

//list the role
export const roleListDetails = () =>

    async (dispatch) => {

        try {
            const response = await axios.get(config.roleList);
            dispatch(roleList({ roleList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };


//feature list

export const featuresListDetails = () =>

    async (dispatch) => {

        try {
            const response = await axios.get(config.features);
            dispatch(featuresList({ featuresList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };

//permisisonlist
export const permissionListDetails = () =>

    async (dispatch) => {

        try {
            const response = await axios.get(config.permission);
            dispatch(permissionList({ permissionList: response.data.data }));
        } catch (error) {
            return error?.response?.data;
        }
    };
//rolepermisision by id


export const permissionListDetailsById = (id) => async (dispatch) => {
    const url = `${config.rolePermission}/${id}`;

    try {
        const response = await axios.get(url);
        // Dispatch the action with the fetched data
        dispatch(permissionListById({ permissionListById: response.data }));
    } catch (error) {
        console.error("Error fetching permission details:", error); // Log the error for debugging
        return error?.response?.data; // Return the error response data if available
    }
};


//delete
export const deleteRolePermissionDetails = (roleId) =>


    async (dispatch) => {

        try {
            const response = await axios.delete(`${config.rolePermission}/${roleId}`);

            dispatch(deleteRolePermissionList({ deleteRolePermissionList: response.data.data }));
            toast.success("Role Deleted Successfully!", {
                display: 'flex',
                toastId: 'user-action',
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast',
            });
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
            return error?.response?.data;
        }
    };



export const rolePermissionSlice = createSlice({
    name: 'rolePermission',
    initialState,
    reducers: {
        rolePermissonCreate(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        roleList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        featuresList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        permissionList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        createRole(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        editRolePermission(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        rolePermissionList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        permissionListById(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        deleteRolePermissionList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(rolePermissionDetails.fulfilled, (state, action) => {
                state.rolePermissonCreate = action.payload;
                // Handle success (e.g., show success toast)
            })
            .addCase(rolePermissionDetails.rejected, (state, action) => {
                // Handle error (e.g., show error toast)
                toast.error(action.payload.message);
            })
            .addCase(editRoleList.fulfilled, (state, action) => {
                state.editRolePermission = action.payload;
                // Handle success...
            })
            .addCase(editRoleList.rejected, (state, action) => {
                // Handle error...
                toast.error(action.payload.message);
            });
        // Add other cases as needed...
    },
})



export const { rolePermissonCreate, roleList, featuresList, permissionList, createRole, rolePermissionList, editRolePermission, permissionListById, deleteRolePermissionList } = rolePermissionSlice.actions;

export default rolePermissionSlice.reducer;
