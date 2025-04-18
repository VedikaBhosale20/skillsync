'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


export let isLoadingData = false ;




  export const UserLogin = createAsyncThunk(
    "UserApi/Login",
    async(values) => {
        isLoadingData = true;
        let formData = new FormData();
        for(const key in values)
        {
            formData.append(key, values[key]);
        };
        try{
        let res = await axios
        .post(`
            ${process.env.API_URL}/UserApi/Login`,

            formData,

            {
                headers: {
                    "Content-Type": "application/form-data"
                }
            }
        )
        isLoadingData = false;
        if(res.data.mtype === "success")
        {
            toast.success(`Welcome ${res.data.username}`)
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

export const Register = createAsyncThunk(
  "UserApi/Register",
  async (values) => {
    isLoadingData = true;
    let formData = new FormData();
    for(const key in values)
    {
        formData.append(key, values[key]);
    };
    try{
    let res = await axios
    .post(`
        ${process.env.API_URL}/UserApi/Register`,

        formData,

        {
            headers: {
                "Content-Type": "application/form-data"
            }
        }
    )
    isLoadingData = false;
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

export const GetUnAssignedUsers = createAsyncThunk(
    "UserApi/GetUnAssignedUsers",
    async (values) => {
        isLoadingData = true;
        try {
            let res = await axios.get(
                `${process.env.API_URL}/UserApi/GetUnAssignedUsers`,
                {
                    headers: {
                        "userid": values.userid,
                        "rolename": values.rolename,
                        "Authorization": `Bearer ${values.token}`
                    }
                }
            );
            isLoadingData = false;
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
        } catch (ex) {
            toast.error(ex.message);
            return ex.message;
        }
    }
)

export const GetApprovedUsers = createAsyncThunk(
    "UserApi/GetApprovedUsers",
    async (values) => {
        isLoadingData = true;
        try {
            let res = await axios.get(
                `${process.env.API_URL}/UserApi/GetApprovedUsers`,
                {
                    headers: {
                        "userid": values.userid,
                        "rolename": values.rolename,
                        "Authorization": `Bearer ${values.token}`
                    }
                }
            );
            isLoadingData = false;
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
        } catch (ex) {
            toast.error(ex.message);
            return ex.message;
        }
    }
)

export const ApproveUnAssignedUsers = createAsyncThunk(
    "UserApi/ApproveUnAssignedUsers",
    async (values) => {
        isLoadingData = true;
        try {
            let res = await axios.get(
                `${process.env.API_URL}/UserApi/ApproveUnAssignedUsers`,
                {
                    headers: {
                        "userid": values.userid,
                        "rolename": values.rolename,
                        "approvalid": values.approvalid,
                        "roletypeid": values.roletypeid,
                        "Authorization": `Bearer ${values.token}`
                    }
                }
            );
            isLoadingData = false;
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
        } catch (ex) {
            toast.error(ex.message);
            return ex.message;
        }
    }
)

export const CreateUser = createAsyncThunk(
    "UserApi/CreateUser",
    async(values) => {
        isLoadingData = true;
        try{
        let res = await axios
        .post(`
            ${process.env.API_URL}/UserApi/CreateUser`,

            values.formData,

            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${values.token}`
                }
            }
        )
        isLoadingData = false;
        if(res.data.mtype === "success")
        {
            toast.success(`Welcome ${res.data.username}`)
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

const authSlice = createSlice({
  name: "auth",
  initialState : {
    userData: {},
    regData: {},
    isLoading: false,
    state: "idle", 
    error: "" ,
    accessToken: "",
    unAssignedUsers: [],
    approvedUsers: [],
  }, 
  reducers: {
    handleLogout: (state) => {
        state.userData = {};
        state.accessToken = "";
        localStorage.clear();
        window.location.replace('/');
    }
  },
   extraReducers: (builder) => {
        builder
        .addCase(UserLogin.pending, (state) => {
            state.state = "loading";
        })
        .addCase(UserLogin.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.userData = action.payload;
            state.accessToken = action.payload.token;
            state.isLoading = false;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        })
        .addCase(UserLogin.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        })
        .addCase(Register.pending, (state) => {
            state.state = "loading";
        })
        .addCase(Register.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.regData = action.payload;
            state.isLoading = false;
        })
        .addCase(Register.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        })
        .addCase(GetUnAssignedUsers.pending, (state) => {
            state.state = "loading";
            state.isLoading = true;
        })
        .addCase(GetUnAssignedUsers.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.unAssignedUsers = action.payload.UnAssignedUsers || [];
            state.isLoading = false;
        })
        .addCase(GetUnAssignedUsers.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        })
        .addCase(GetApprovedUsers.pending, (state) => {
            state.state = "loading";
            state.isLoading = true;
        })
        .addCase(GetApprovedUsers.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.approvedUsers = action.payload.ApprovedUsers || [];
            state.isLoading = false;
        })
        .addCase(GetApprovedUsers.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        })
        .addCase(ApproveUnAssignedUsers.pending, (state) => {
            state.state = "loading";
            state.isLoading = true;
        })
        .addCase(ApproveUnAssignedUsers.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.isLoading = false;
        })
        .addCase(ApproveUnAssignedUsers.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        })
        .addCase(CreateUser.pending, (state) => {
            state.state = "loading";
            state.isLoading = true;
        })
        .addCase(CreateUser.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.isLoading = false;
            state.regData = action.payload;
        })
        .addCase(CreateUser.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
            state.isLoading = false;
        });
    }
});

export const { handleLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authReducer;


