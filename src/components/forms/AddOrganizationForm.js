"use client";
import MasterHook from "@/lib/masters";
import { Organization } from "@/models/Organization";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";


export default function AddOrganizationForm({ initialValues, submitAction }) {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const { organizationTypes } = MasterHook();

    const inputFields = [
        { value: "organizationname", label: "Organization Name", type: "text" },
        { value: "organizationdescription", label: "Description", type: "text" },
        { value: "contact", label: "Contact Number", type: "text" },
        { value: "email", label: "Email", type: "email" },
        { value: "website", label: "Website", type: "text" },
        { value: "location", label: "Location", type: "text" },
        { value: "organizationlogo", label: "Organization Logo", type: "file" },
        { value: "organizationtypeid", label: "Organization Type", type: "select" },
    ]

    return(
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <Formik
                initialValues={initialValues}
                validationSchema={Organization}
                onSubmit={(values) => {
                    console.log(values);
                    submitAction(values);
                }}>
            {({ errors, touched }) => (
                    <Form>
                        {inputFields.map((input, index) => {
                        if (input.value !== "organizationtypeid")
                          return (
                            <div key={index} className="w-full mb-3">
                                <label
                                    className="block uppercase text-xs font-bold mb-2"
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
                        )
                        else return (
                                    <div className="w-full lg:w-4/12 px-4" key={index}>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-xs font-bold mb-2"
                                                htmlFor={input.value}
                                                style={{ color: '#167a75' }}
                                            >
                                                {input.label}
                                            </label>
                                            <select
                                                name={input.value}
                                                id={input.value}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                onChange={(e) => setFieldValue(input.value, e.target.value)}
                                            >
                                                <option value="">{initialValues.organizationtypeid ? initialValues.organizationtypeid : 'Select a Type'}</option>
                                                {organizationTypes.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {touched[input.value] && errors[input.value] ? (
                                                <div className="mt-1 text-red-600" style={{ color: '#ef4444' }}>
                                                    {errors[input.value]}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                )})}

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
    )
}