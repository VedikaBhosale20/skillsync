"use client";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Candidate } from "@/models/Candidate";
import MasterHook from "@/lib/masters";

export default function CandidateForm({ initialValues, submitAction, rolename }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const userid = useSelector((state) => state.auth.user?.id);
  const organizationid = useSelector((state) => state.auth.user?.organizationid);
  const { specializationTypes, educationTypes, skillTypes } = MasterHook();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Default initial values if not provided
  const defaultValues = {
    firstname: "",
    lastname: "",
    gender: "",
    username: "",
    password: "",
    mobile: "",
    email: "",
    dob: "",
    pan: "",
    aadhar: "",
    specializationid: "",
    educationtypeid: "",
    institution: "",
    startdate: "",
    enddate: "",
    // Hidden fields that will be added automatically
    userid: userid || "",
    organizationid: organizationid || "",
    rolename: rolename || ""
  };

  // Personal information fields
  const personalFields = [
    { value: "firstname", label: "First Name", type: "text" },
    { value: "lastname", label: "Last Name", type: "text" },
    { value: "gender", label: "Gender", type: "select", options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ]},
    { value: "username", label: "Username", type: "text" },
    { value: "password", label: "Password", type: "password" },
    { value: "mobile", label: "Mobile Number", type: "text" },
    { value: "email", label: "Email Address", type: "email" },
    { value: "dob", label: "Date of Birth", type: "date" },
    { value: "pan", label: "PAN Number", type: "text" },
    { value: "aadhar", label: "Aadhar Number", type: "text" }
  ];

  // Education fields
  const educationFields = [
    { value: "specializationid", label: "Specialization", type: "select" },
    { value: "educationtypeid", label: "Education Type", type: "select" },
    { value: "institution", label: "Institution Name", type: "text" },
    { value: "startdate", label: "Start Date", type: "date" },
    { value: "enddate", label: "End Date", type: "date" }
  ];

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <h6 className="text-xl font-bold mb-6">Create New Candidate</h6>
      
      <Formik
        initialValues={initialValues}
        validationSchema={Candidate}
        enableReinitialize={true}
        onSubmit={(values) => {
          const formData = new FormData();
          
          // Add auth fields
          formData.append("userid", userid);
          formData.append("rolename", rolename);
          formData.append("organizationid", organizationid);
          
          // Add form values
          Object.keys(values).forEach((key) => {
            if (values[key] !== null && values[key] !== undefined && values[key] !== "") {
              formData.append(key, values[key]);
            }
          });
          
          // Add profile picture if selected
          if (selectedFile) {
            formData.append("profilepic", selectedFile);
          }
          
          submitAction(formData);
        }}
      >
        {({ errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalFields.map((input, index) => (
                    <div key={index} className="mb-3">
                      <label 
                        className="block uppercase text-xs font-bold mb-2" 
                        htmlFor={input.value}
                        style={{ color: "#000000" }}
                      >
                        {input.label}
                      </label>
                      {input.type === "select" ? (
                        <Field
                          as="select"
                          name={input.value}
                          id={input.value}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value="">Select {input.label}</option>
                          {input.options.map((option) => (
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
                      {touched[input.value] && errors[input.value] && (
                        <div className="mt-1 text-red-600" style={{ color: "#ef4444" }}>
                          {errors[input.value]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Profile Picture */}
              <div className="col-span-2 mb-6">
                <label 
                  className="block uppercase text-xs font-bold mb-2"
                  style={{ color: "#000000" }}
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
                {errors.profilepic && (
                  <div className="mt-1 text-red-600" style={{ color: "#ef4444" }}>
                    {errors.profilepic}
                  </div>
                )}
              </div>
              
              {/* Education Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Education Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educationFields.map((input, index) => (
                    <div key={index} className="mb-3">
                      <label 
                        className="block uppercase text-xs font-bold mb-2" 
                        htmlFor={input.value}
                        style={{ color: "#000000" }}
                      >
                        {input.label}
                      </label>
                      {input.type === "select" ? (
                        <Field
                          as="select"
                          name={input.value}
                          id={input.value}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value="">Select {input.label}</option>
                          {(input.value === "specializationid" 
                            ? specializationTypes
                            : input.value === "educationtypeid" 
                              ? educationTypes 
                              : []
                          ).map((option) => (
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
                      {touched[input.value] && errors[input.value] && (
                        <div className="mt-1 text-red-600" style={{ color: "#ef4444" }}>
                          {errors[input.value]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                {isLoading ? "Loading..." : "Create Candidate"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}