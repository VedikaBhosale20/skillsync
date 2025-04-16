"use client";
import AddOrganizationForm from '@/components/forms/AddOrganizationForm';
import { CreateOrganization } from '@/lib/features/OrganizationSlice/OrgSlice';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AddOrganization = () => {
    const [userData, setUserData] = React.useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const data = useSelector((state) => state.organization.data);
    const error = useSelector((state) => state.organization.error);
    const isLoading = useSelector((state) => state.organization.isLoading);

    React.useEffect(() => {
        try {
          const data = JSON.parse(localStorage.getItem("userData"));
          setUserData(data);
        } catch(err) {
          console.error("Error Parsing user data:", err);
        }
      }, []);

    const initialValues = {
        userid: userData?.tokenid || "",
        rolename: userData?.rolename || "",
        organizationname: "",
        organizationdescription: "",
        contact: "",
        email: "",
        website: "",
        organizationlogo: null,
        organizationtypeid: 0,
        location: ""
    }

    const handleSubmit = async (values) => {
        dispatch(CreateOrganization(values))
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {!isLoading ?
        (
            <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Add Organization</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <AddOrganizationForm initialValues={initialValues} submitAction={handleSubmit} />
            </div>
        </div>
        ) : (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
                <Loader />
            </div>
        )}
    </div>
  )
}

export default AddOrganization
