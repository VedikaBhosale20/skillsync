"use client"
import * as Yup from "yup";


export const SignInSchema = Yup.object({
    username: Yup.string().required("A username is required"),
    password: Yup.string().required("A password is required"),
})