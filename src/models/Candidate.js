"use client";
import * as Yup from 'yup';


export const Candidate = Yup.object().shape({
  userid: Yup.number()
    .required('User ID is required'),
  
  rolename: Yup.string()
    .required('Role name is required'),
  
  organizationid: Yup.number()
    .required('Organization ID is required'),
  

  firstname: Yup.string()
    .required('First name is required')
    .max(100, 'First name must be less than 100 characters'),
  
  lastname: Yup.string()
    .required('Last name is required')
    .max(100, 'Last name must be less than 100 characters'),
  
  gender: Yup.string()
    .required('Gender is required'),
  
  username: Yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(50, 'Username must be less than 50 characters'),
  
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  
  dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  
  aadhar: Yup.string()
    .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits'),
  
  profilepic: Yup.mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
  
  // Education information
  specializationid: Yup.number()
    .typeError('Specialization ID must be a number')
    .positive('Specialization ID must be positive'),
  
  educationtypeid: Yup.number()
    .typeError('Education type ID must be a number')
    .positive('Education type ID must be positive'),
  
  institution: Yup.string()
    .max(200, 'Institution name must be less than 200 characters'),
  
  startdate: Yup.date(),
  
  enddate: Yup.date()
    .min(
      Yup.ref('startdate'),
      'End date cannot be earlier than start date'
    )
});