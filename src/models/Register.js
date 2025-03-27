import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
  password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
  username: Yup.string().required('Username is required'),
  mobile: Yup.string()
        .matches(/^[0-9]+$/, 'Mobile number must be digits')
        .min(10, 'Mobile number must be at least 10 digits')
        .max(15, 'Mobile number cannot exceed 15 digits')
        .required('Mobile number is required')
})