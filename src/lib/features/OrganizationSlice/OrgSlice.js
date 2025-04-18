'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const CreateOrganization = createAsyncThunk(
    "UserApi/CreateOrganization",
    async(values) => {
        try{
        let res = await axios
        .post(`
            ${process.env.API_URL}/UserApi/CreateOrganization`,
            values.formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${values.token}`
                }
            }
        )
        if(res.data.mtype === "success")
        {
            return res.data;
        }
        if(res.data.mtype === "warning")
        {
            toast.error(res.data.message);
            return res.data;
        }
    }
        catch(ex) {
                toast.error(ex.message)
                return ex.message;
        }
    }
)

export const GetOrganizationUsers = createAsyncThunk(
    "UserApi/GetOrganizationUsers",
    async(values) => {
        try{
        let res = await axios
        .get(`${process.env.API_URL}/UserApi/GetOrganizationUsers`,
            {
                headers: {
                    "Authorization": `Bearer ${values.token}`,
                    "organizationid": values.organizationid
                }
            }
         )
         if(res.data.mtype === "success")
            {
                toast.success(res.data.message);
                return res.data;
            }
            if(res.data.mtype === "warning")
            {
                toast.error(res.data.message);
                return res.data;
            }
        }
        catch(ex) {
            toast.error(ex.message)
            return ex.message;
        }
    }
)

export const CreateCandidate = createAsyncThunk(
    "UserApi/CreateCandidate",
    async(values) => {
        try{
            let res = await axios
            .post(
                `${process.env.API_URL}/UserApi/CreateCandidate`,
                
                values.formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${values.token}`
                    }
                }
            )
            if(res.data.mtype === "success")
                {
                    toast.success(`Welcome ${res.data.username}`);
                    return res.data;
                }
            if(res.data.mtype === "warning")
                {
                    toast.error(res.data.message);
                    return res.data;
                }
        }
        catch(ex) {
            toast.error(ex.message)
            return ex.message;
        }
    }
)

const OrganizationSlice = createSlice({
    name: "organization",
    initialState: {
        isLoading: false,
        data: {},
        error: "",
        state: "idle",
        orgUsers: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateOrganization.pending, (state) => {
                state.isLoading = true;
                state.state = "loading";
            })
            .addCase(CreateOrganization.fulfilled, (state, action) => {
                state.state = "succeeded";
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(CreateOrganization.rejected, (state, action) => {
                state.state = "failed";
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(GetOrganizationUsers.pending, (state) => {
                state.isLoading = true;
                state.state = "loading";
            })
            .addCase(GetOrganizationUsers.fulfilled, (state, action) => {
                state.state = "succeeded";
                state.isLoading = false;
                state.orgUsers = action.payload.OrganizationUsers || [];
            })
            .addCase(GetOrganizationUsers.rejected, (state, action) => {
                state.state = "failed";
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const OrganizationReducer = OrganizationSlice.reducer;
export default OrganizationReducer;