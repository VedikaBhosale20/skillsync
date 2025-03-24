"use client";
import React from 'react';

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { UserLogin, isLoadingData } from '@/lib/features/auth/AuthSlice';

//formik imports
import { useFormik } from "formik";
import { SignInSchema } from '@/models/SignIn';


const Login = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit: async (values) => {
        dispatch(UserLogin(values));
      }
    });
  return (
    <div>
                <form onSubmit={formik.handleSubmit} > 
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      id="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...formik.getFieldProps("username")}
                      placeholder="Username"
                      id="username"
                    />
                    {formik.errors.username ? (
                              <div className="mt-1 text-red-600">{formik.errors.username}</div>
                            ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      id="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...formik.getFieldProps("password")}
                      placeholder="Password"
                      id="password"
                    />
                    {formik.errors.password ? (
                      <div className="mt-1 text-red-600">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={isLoadingData}
                    >
                      {isLoadingData ? "Loading" : "Sign In"}
                    </button>
                  </div>
                </form>
    </div>
  )
}

export default Login
