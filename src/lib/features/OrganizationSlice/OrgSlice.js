'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const CreateOrganization = createAsyncThunk(
    "UserApi/CreateOrganization",
    async(values) => {
        let formData = new FormData();
        for(const key in values)
        {
            if (key === "organizationlogo") {
                cleanedValues.images.forEach((file) => {
                    formData.append("organizationlogo", file);
                });
            } else {
                formData.append(key, cleanedValues[key]);
            }
        };
        try{
        let res = await axios
        .post(`
            ${process.env.API_URL}/UserApi/CreateOrganization`,
            formData,
            {
                headers: {
                    "Content-Type": "application/form-data"
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

const OrganizationSlice = createSlice({
    name: "organization",
    initialState: {
        isLoading: false,
        data: {},
        error: "",
        state: "idle"
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
            });
    },
});

export const OrganizationReducer = OrganizationSlice.reducer;
export default OrganizationReducer;