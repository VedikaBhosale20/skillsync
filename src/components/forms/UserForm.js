"use client";
import { User } from "@/models/User";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import MasterHook from "@/lib/masters";

export default function UserForm({ initialValues, submitAction, rolename }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { organizationTypes, roles } = MasterHook();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const inputFields = [
    {value: "roletypeid", label: "Role Type", type: "select"},
    { value: "firstname", label: "First Name", type: "text" },
    { value: "lastname", label: "Last Name", type: "text" },
    { value: "email", label: "Email", type: "email" },
    { value: "mobile", label: "Mobile", type: "text" },
    { value: "username", label: "Username", type: "text" },
    { value: "password", label: "Password", type: "password" },
    { value: "gender", label: "Gender", type: "select", options: [
      {label: "male", value: 1}, 
      {label: "female", value: 2},
      {label: "other", value: 3}]},
    { value: "pan", label: "PAN", type: "text" },
    { value: "aadhar", label: "Aadhar", type: "text" },
    { value: "dob", label: "Date of Birth", type: "date" },
  ];

  const orgFields = [
    { value: "organizationname", label: "Organization Name", type: "text" },
    { value: "organizationdescription", label: "Description", type: "text" },
    { value: "contact", label: "Contact Number", type: "text" },
    { value: "email", label: "Org Email", type: "email" },
    { value: "website", label: "Website", type: "text" },
    { value: "location", label: "Location", type: "text" },
    { value: "organizationtypeid", label: "Organization Type", type: "select" },
  ];

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <Formik
        initialValues={initialValues}
        validationSchema={User}
        enableReinitialize={true}
        onSubmit={(values) => {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if (values[key]) formData.append(key, values[key]);
          });
          if (selectedFile) formData.append("profilepic", selectedFile);
          submitAction(formData);
        }}
      >
        {({ errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {inputFields.map((input, index) => (
              <div key={index} className="w-full mb-3">
                <label 
                  className="block uppercase text-xs font-bold mb-2" 
                  htmlFor={input.value}
                  style={{ color: "#000000" }}
                >
                  {input.label}
                </label>
                {input.type === "select" ? (
                  <div className="w-full mb-3" key={index}>
                    <Field
                      as="select"
                      name={input.value}
                      id={input.value}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                      <option value="">Select a Type</option>
                      {(input.value === "roletypeid" ? roles : input.options).map((option) => (
                          <option key={option.value} value={input.value === "roletypeid" ? option.value : option.label}>
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
                ) : (
                  <Field
                    type={input.type}
                    name={input.value}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={input.label}
                    id={input.value}
                  />
                )}
                {touched[input.value] && errors[input.value] && (
                  <div className="mt-1 text-red-600" style={{ color: "#ef4444" }}>
                    {errors[input.value]}
                  </div>
                )}
              </div>
            ))}

            {/* Superadmin Org Fields */}
            {rolename === "superadmin" &&
              orgFields.map((input, index) => (
                <div key={`org-${index}`} className="w-full mb-3">
                  <label 
                    className="block uppercase text-xs font-bold mb-2" 
                    htmlFor={input.value}
                    style={{ color: "#167a75" }}
                  >
                    {input.label}
                  </label>
                  {input.value === "organizationtypeid" ? (
                    <Field 
                      as="select" 
                      name={input.value} 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      id={input.value}
                    >
                      <option value="">Select a Type</option>
                      {organizationTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type={input.type}
                      name={input.value}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={input.label}
                      id={input.value}
                    />
                  )}
                  {errors[input.value] && touched[input.value] && (
                    <div className="mt-1 text-red-600" style={{ color: "#ef4444" }}>
                      {errors[input.value]}
                    </div>
                  )}
                </div>
              ))}

            {/* Profile Picture */}
            <div className="w-full mb-3">
              <label 
                className="block uppercase text-xs font-bold mb-2"
                style={{ color: "#167a75" }}
              >
                Profile Picture
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="border-0 px-3 py-3 bg-gray-200 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 mr-2"
                >
                  Choose File
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                style={{
                  backgroundColor: isLoading ? "#ccc" : "#4c51bf",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Loading..." : "Create User"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}