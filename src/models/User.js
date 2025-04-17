"use client";
import * as Yup from 'yup';

export const User = Yup.object().shape({
  roleid: Yup.string().required('Role ID is required'),
  userid: Yup.string().required('User ID is required'),
  rolename: Yup.string().required('Role name is required'),

  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile must be 10 digits')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  firstname: Yup.string().nullable(),
  lastname: Yup.string().nullable(),
  username: Yup.string().required("Username is required"),
  gender: Yup.string().nullable(),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .nullable(),
  pan: Yup.string().nullable(),
  aadhar: Yup.string().matches(/^\d{12}$/, 'Aadhar must be 12 digits').nullable(),
  dob: Yup.date().typeError('Date of birth must be a valid date').nullable(),
  profilepic: Yup.mixed().nullable(),

  organizationname: Yup.string().nullable(),
  organizationdescription: Yup.string().nullable(),
  contact: Yup.string().nullable(),
  website: Yup.string().url('Must be a valid URL').nullable(),
  organizationtypeid: Yup.string().nullable(),
  location: Yup.string().nullable(),
  organizationid: Yup.string().nullable(),

  roletypeid: Yup.string().required('Role type ID is required'),
  organizationid: Yup.string().required('Organization ID is required'),
});
