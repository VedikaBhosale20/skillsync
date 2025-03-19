import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "next/headers";



export let isLoadingData = false ;
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
    .addCase
  }
});


export const authReducer = authSlice.reducer;
export default authReducer;


