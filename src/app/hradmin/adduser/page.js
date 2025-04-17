'use client';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '@/components/forms/UserForm';
import { CreateUser } from '@/lib/features/auth/AuthSlice';

const AddUser = () => {
    const [userData, setUserData] = useState(null);
    const [formInitialized, setFormInitialized] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const data = useSelector((state) => state.auth.regData);
    const error = useSelector((state) => state.auth.error);
    const isLoading = useSelector((state) => state.auth.isLoading);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem("userData"));
            setUserData(data);
            setFormInitialized(true);
        } catch(err) {
            console.error("Error Parsing user data:", err);
            setFormInitialized(true); // Still initialize form even if there's an error
        }
    }, []);

    // Watch for submission results
    useEffect(() => {
        if (!isLoading && data !== null) {
            if (data.mtype === "success") {
                toast.success(data.message);
                router.push("/hradmin");
            } else if (data.mtype === "warning") {
                toast.error(data.message);
            }
        }
        
        if (error !== null && error !== "") {
            toast.error(error);
        }
    }, [data, error, isLoading, router]);

    const initialValues = {
        userid: userData?.tokenid || "",
        rolename: userData?.rolename || "",
        roleid: userData?.tokenid || "",
        roletypeid: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        gender: "",
        pan: "",
        aadhar: "",
        dob: "",
        organizationid: userData?.organizationid || "",
        profilepic: null,
        organizationname: "",
        organizationdescription: "",
        contact: "",
        website: "",
        location: "",
        organizationtypeid: "",
      };

      const handleSubmit = async (formData) => {
        console.log("Form Data:", formData);
        dispatch(CreateUser({formData: formData, token: userData?.token}));
        if(data !== null && data.mtype === "success")
        {
            toast.success(data.message);
            router.push("/hradmin");
        }
        if(data !== null && data.mtype === "warning")
        {
            toast.error(data.message);
        }
        if(error !== null && error !== "")
        {
            toast.error(error);
        }
    }

    if (!formInitialized) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        userData.organizationid !== null &&
        (<div className="flex flex-col min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-4">Add Organization</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <UserForm
                            initialValues={initialValues} 
                            submitAction={handleSubmit}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <Loader />
                </div>
            )}
        </div>)
    );
}

export default AddUser
