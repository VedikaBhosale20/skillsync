"use client";
import React from "react";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { UserLogin, isLoadingData } from "@/lib/features/auth/AuthSlice";

// Formik imports
import { useFormik } from "formik";
import { SignInSchema } from "@/models/SignIn";

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
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-indigo-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 ease-in-out ${
                formik.errors.username && formik.touched.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your username"
            />
            {formik.errors.username && formik.touched.username && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 ease-in-out ${
                formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-blue-700 transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed`}
            disabled={isLoadingData}
          >
            {isLoadingData ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
