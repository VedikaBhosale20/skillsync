"use client" ;
import {useFormik} from "formik";
import * as Yup from "yup" ;

export default function StudentForm() {

    const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3,"Too short"),
    email: Yup.string().email("Invalud email address").required("Email is required"),
    degree: Yup.string().required("Degree is required"),
    skills: Yup.string().min(5,"Skills should be descriptive").required("Skills are required"),
    });

    const formik = useFormik({
        initialValues:{
            name: "" ,
            email: "" ,
            degree: "" ,
            skills: "",     
         } ,
         validationSchema ,
         onSubmit : (values) => {
            console.log("Submitted Data:", values);
            alert("Form submitted successfully!") ;
         },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-3 bg-indigo-100 rounded-lg"> 
        <div className="mb-3">
            <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value="{formik.values.name}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
            />
            {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
        </div>

        <div className="mb-3">
        <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value="{formik.values.email}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
        </div>

        <div className="mb-3">
        <input
            type="text"
            name="degree"
            placeholder="Enter Degree"
            value="{formik.values.degree}"
            onChange="{formik.handleChange}"
            onBlur="{formik.handleBlur}"
            className="p-2 border border-white rounded w-full"
        />
        {formik.touched.degree && formik.errors.degree && (
          <p className="text-red-500 text-sm">{formik.errors.degree}</p>
        )}
        </div>

        <div className="mb-3">
        <textarea
          name="skills"
          placeholder="List Your Skills"
          value={formik.values.skills}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="p-2 border border-gray-300 rounded w-full"
        />
        {formik.touched.skills && formik.errors.skills && (
          <p className="text-red-500 text-sm">{formik.errors.skills}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-yellow-200 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
        
     </form>
    )
}


 

