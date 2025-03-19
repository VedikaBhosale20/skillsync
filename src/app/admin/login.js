"use client";
import React from "react";

// Redux Imports
import { useDispatch } from "react-redux";
import { login, isLoadingData } from "lib/features/auth/authSlice";

// layout for page
import Auth from "layouts/Auth.js";

// Yup Form imports
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Login() {
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState("");
  // const [submitting, setSubmitting] = React.useState(false);
  React.useEffect(() => {
    try{
      const data = JSON.parse(localStorage.getItem("userData"));
      setUserData(data)
    }
    catch(err)
    {
      console.error("Error Parsing user data" + err)
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("A Username is Required!"),
      password: Yup.string().required("A Password is Required!")
    }),
    onSubmit: async (values) => {
      // setSubmitting(!submitting)
      dispatch(login(values));
      // setSubmitting(false);
    }
  })

  const handleNavigation = (userrole) => {
    if(userrole === "superadmin")
    {
      return "/admin/dashboard"
    }
    else
    {
      return "/landing"
    }
  }

  if (userData && userData.rolename) {
    window.location.replace(handleNavigation(userData.rolename));
    return;
  }
  return (
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
            </div>
            <div className="flex flex-wrap mt-6 relative">
            </div>
          </div>
        </div>
      </div>
  );
}

Login.layout = Auth;