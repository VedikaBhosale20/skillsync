'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export let isLoadingData = false ;

const handleNavigation = (userrole) => {
    switch(userrole) {
      case "superadmin":
        return "/admin/dashboard";
      case "hradmin":
        return "/hradmin/dashboard";
      case "hruser":
        return "/hr/dashboard";
      case "student":
        return "/student/dashboard";
      default:
        return "/landing";
    }
  };

export const login = createAsyncThunk(
    "api/login",
    async (values)=>{
     isLoadingData = true ;
     try{
        let res = await axios
        .post(
            `${process.env.API_URL}/api/login`,
            values
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
    user: {},
    isLoading: false,
    state: "idle", 
    error: "" ,
    accessToken: ""
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
        .addCase(login.pending, (state) => {
            state.state = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.userData = action.payload;
            state.accessToken = action.payload.token;
            localStorage.setItem("userData", JSON.stringify(action.payload));
            window.location.replace(handleNavigation(data.userrole));
        })
        .addCase(login.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
        });

    }
});


export const authReducer = authSlice.reducer;
export default authReducer;


