"use client"
import * as Yup from "yup";

export const User = Yup.object({
       username:Yup.string().required("Username is required"),
       email: Yup.string().email("Invalid email").required("Email is required"),
       password:  Yup.string().required("Password is required")
       .min(6, "Password must be at least 6 characters"),
})