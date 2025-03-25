"use client" ;

import { useFormik } from "formik";
import * as Yup from "yup" ;

export default function userForm() {

    const validationSchema = Yup.object ({
       username:Yup.string().required("Username is required"),
       email: Yup.string().email("Invalid email").required("Email is required"),
       password:  Yup.string().required("Password is required")
       .min(6, "Password must be at least 6 characters"),
    });

    const formik = useFormik({
        initialValues:{
            name: "" ,
            email: "" ,
            password: "" ,    
         } ,
         validationSchema ,
         onSubmit : (values) => {
            console.log("User Form Submited: ", values);
            alert("User Registration successful!") ;
         },
        });

        return(
            <form onSubmit={formik.handleSubmit} className="p-3 bg-indigo-100 rounded-lg"> 
        <div className="mb-3">
            <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value="{formik.values.username}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
            />
            {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
        </div>

        <div className="mb-3">
        <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value="{formik.values.email}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
        />
        {formik.touched.degree && formik.errors.degree && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
        </div>

        <div className="mb-3">
        <input
            type="text"
            name="password"
            placeholder="Enter Password"
            value="{formik.values.password}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
        />
        {formik.touched.degree && formik.errors.degree && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
        </div>

        <button
        type="submit"
        className="bg-yellow-200 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>

        )
}

