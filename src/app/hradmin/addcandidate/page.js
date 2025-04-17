'use client';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CandidateForm from '@/components/forms/CandidateForm';
import { CreateCandidate } from '@/lib/features/OrganizationSlice/OrgSlice';

const AddCandidate = () => {
    const [userData, setUserData] = useState(null);
    const [formInitialized, setFormInitialized] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const data = useSelector((state) => state.organization.data);
    const error = useSelector((state) => state.organization.error);
    const isLoading = useSelector((state) => state.organization.isLoading);

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
        organizationid: userData?.organizationid || "",
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
      };

      const handleSubmit = async (formData) => {
        console.log("Form Data:", formData);
        dispatch(CreateCandidate({formData: formData, token: userData?.token}));
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-4">Add Organization</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <CandidateForm
                            initialValues={initialValues} 
                            submitAction={handleSubmit}
                            rolename={userData?.rolename}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <Loader />
                </div>
            )}
        </div>
    );
}

export default AddCandidate;