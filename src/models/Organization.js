"use client";
import * as Yup from "yup";

export const Organization = Yup.object({
    userid: Yup.number().required("User ID is required"),
    rolename: Yup.string().required("Role name is required"),
    organizationname: Yup.string().required("Organization name is required"),
    organizationdescription: Yup.string().required("Organization description is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    website: Yup.string().url("Invalid URL").required("Website is required"),
    organizationlogo: Yup.mixed()
    .test('fileFormat', 'Only jpg/jpeg/png files allowed', value => {
        if(typeof value === 'string' || Object) return true
        if(value)
        {
            return PHOTO_SUPPORTED_FORMATS.includes(value.type);
        }
        return true;
    })
    .test('fileSize', 'File size must be less than 5MB', value => {
        if(typeof value === 'string' || Object) return true
        if(value)
        {
            return value.size <= MAX_FILE_SIZE
        }
        return true;
    }).nullable(),
    organizationtypeid: Yup.number().required("Organization type is required"),
    location: Yup.string().required("Location is required")
})