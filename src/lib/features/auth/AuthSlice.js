'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";



export let isLoadingData = false ;


const handleNavigation = (userrole) => {
  const router = useRouter();
    switch(userrole) {
      case "superadmin":
        router.push("/admin/");
      case "hradmin":
        router.push("/hradmin/dashboard/");
      case "hruser":
        router.push("/hruser/");
      case "student":
        router.push("/student/");
      default:
        router.push("/");
    }
  };

export const UserLogin = createAsyncThunk(
    "UserApi/Login",
    async (values)=>{
     isLoadingData = true ;
     try{
        let res = await axios
        .post(
            `${process.env.API_URL}/UserApi/Login`,
            values
        )
        isLoadingData = false;
        if(res.data.mtype === "success")
        {
            toast.success(`Welcome ${res.data.username}`)
            handleNavigation(res.data.rolename);
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
        .addCase(UserLogin.pending, (state) => {
            state.state = "loading";
        })
        .addCase(UserLogin.fulfilled, (state, action) => {
            state.state = "succeeded";
            state.userData = action.payload;
            state.accessToken = action.payload.token;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        })
        .addCase(UserLogin.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.error.message || action.payload.message;
        });

    }
});


export const authReducer = authSlice.reducer;
export default authReducer;


