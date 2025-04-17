"use client";
import MasterHook from "@/lib/masters";
import { OrganizationSchema } from "@/models/Organization";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

export default function AddOrganizationForm({ initialValues, submitAction }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { organizationTypes } = MasterHook();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const inputFields = [
    { value: "organizationname", label: "Organization Name", type: "text" },
    { value: "organizationdescription", label: "Description", type: "text" },
    { value: "contact", label: "Contact Number", type: "text" },
    { value: "email", label: "Email", type: "email" },
    { value: "website", label: "Website", type: "text" },
    { value: "location", label: "Location", type: "text" },
    { value: "organizationtypeid", label: "Organization Type", type: "select" },
  ];

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <Formik
        initialValues={initialValues}
        validationSchema={OrganizationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          const formData = new FormData();
          
          Object.keys(values).forEach(key => {
            if (key !== "organizationlogo") {
              formData.append(key, values[key]);
            }
          });
          
          if (selectedFile) {
            formData.append("organizationlogo", selectedFile);
          }
          
          submitAction(formData);
        }}
      >
        {({ errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                );
              else
                return (
                  <div className="w-full mb-3" key={index}>
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor={input.value}
                      style={{ color: "#167a75" }}
                    >
                      {input.label}
                    </label>
                    <Field
                      as="select"
                      name={input.value}
                      id={input.value}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                      <option value="">Select a Type</option>
                      {organizationTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {touched[input.value] && errors[input.value] ? (
                      <div
                        className="mt-1 text-red-600"
                        style={{ color: "#ef4444" }}
                      >
                        {errors[input.value]}
                      </div>
                    ) : null}
                  </div>
                );
            })}

            {/* Logo upload field */}
            <div className="w-full mb-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="organizationlogo"
              >
                Organization Logo
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setSelectedFile(file);
                    // We don't set the field value here since Formik can't handle File objects properly
                  }}
                  className="hidden"
                  id="organizationlogo"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="border-0 px-3 py-3 bg-gray-200 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 mr-2"
                >
                  Choose File
                </button>
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
            </div>

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
}