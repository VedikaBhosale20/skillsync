"use client";
import React from "react";
import { useRouter } from "next/navigation";

// formik imports
import { Formik, Form, Field } from "formik";
import { RegisterSchema } from "@/models/Register";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { Register } from "@/lib/features/auth/AuthSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isLoading = useSelector((state) => state.auth.isLoading);

    const inputFields = [
        { value: "firstname", label: "First Name", type: "text" },
        { value: "lastname", label: "Last Name", type: "text" },
        { value: "email", label: "Email", type: "email" },
        { value: "username", label: "Username", type: "text" },
        { value: "password", label: "Password", type: "password" },
        { value: "mobile", label: "Mobile Number", type: "text" },
    ];

    
const handleSubmit = async (values) => {
    const resultAction = await dispatch(Register(values));
    if (Register.fulfilled.match(resultAction)) {
      router.push("/auth");
    }
  };

    return (
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <Formik
                initialValues={{
                    firstname: "",
                    lastname: "",
                    email: "",
                    username: "",
                    password: "",
                    mobile: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                    console.log(values);
                    handleSubmit(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        {inputFields.map((input, index) => (
                            <div key={index} className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor={input.value}
                                >
                                    {input.label}
                                </label>
                                <Field
                                    type={input.type}
                                    name={input.value}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder={input.label}
                                    id={input.value}
                                />
                                {errors[input.value] && touched[input.value] ? (
                                    <div className="mt-1 text-red-600">{errors[input.value]}</div>
                                ) : null}
                            </div>
                        ))}

                        <div className="text-center mt-6">
                            <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    backgroundColor: isLoading ? "#ccc" : "#4c51bf",
                                    cursor: isLoading ? "not-allowed" : "pointer",
                                }}
                            >
                                {isLoading ? "Loading" : "Register"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;