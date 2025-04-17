'use client';
import React from 'react';
import axios from 'axios';

const MasterHook = () => {
    const [roles, setRoles] = React.useState([]);
    const [organizationTypes, setOrganizationTypes] = React.useState([]);
    const [educationTypes, setEducationTypes] = React.useState([]);
    const [specializationTypes, setSpecializationTypes] = React.useState([]);
    const [skillTypes, setSkillTypes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetchFunction(setRoles, "UserApi/GetRoles")
        fetchFunction(setOrganizationTypes, "UserApi/GetOrganizationTypes")
        fetchFunction(setEducationTypes, "UserApi/GetEducationTypes")
        fetchFunction(setSkillTypes, "UserApi/GetSkillTypes")
    }, [])

    const fetchFunction = async(setVariable, route) => {
        try{
            setLoading(true);
            const res = await axios.get(`${process.env.API_URL}/${route}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            if(res.data.mtype === "success")
            {
                if(setVariable === setRoles)
                {
                    let x = res.data.roles;
                    let y = [];
                    for(let i = 0; i < x.length; i++)
                    {
                        y.push({
                            value : x[i].code,
                            label : x[i].name
                        })
                    }
                    setVariable(y);
                }
                if(setVariable === setOrganizationTypes)
                {
                    let x = res.data.organizationtypes;
                    let y = [];
                    for(let i = 0; i < x.length; i++)
                    {
                        y.push({
                            value : x[i].code,
                            label : x[i].name
                        })
                    }
                    setVariable(y);
                }
                if(setVariable === setEducationTypes)
                {
                    let x = res.data.EducationTypes;
                    let y = [];
                    for(let i = 0; i < x.length; i++)
                    {
                        y.push({
                            value : x[i].code,
                            label : x[i].name
                        })
                    }
                    setVariable(y);
                }
                if(setVariable === setSkillTypes)
                {
                    let x = res.data.SkillTypes;
                    let y = [];
                    for(let i = 0; i < x.length; i++)
                    {
                        y.push({
                            value : x[i].code,
                            label : x[i].name
                        })
                    }
                    setVariable(y);
                }
                if(setVariable === setSpecializationTypes)
                {
                    let x = res.data.specializations;
                    let y = [];
                    for(let i = 0; i < x.length; i++)
                    {
                        y.push({
                            value : x[i].code,
                            label : x[i].name
                        })
                    }
                    setVariable(y);
                }
            }
            if(res.data.mtype === "warning")
            {
                setVariable([]);
            }
            setLoading(false);
        }
        catch(ex) {
            setVariable([]);
            setLoading(false);
        }}
  
        const conditionalFetchFunction = async(setVariable, route, header, value) => {
            try{
                setLoading(true);
                const res = await axios.get(`${process.env.API_URL}/${route}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            [header]: value
                        }
                    })
                if(res.data.mtype === "success")
                {
                    if(setVariable === setRoles)
                    {
                        let x = res.data.roles;
                        let y = [];
                        for(let i = 0; i < x.length; i++)
                        {
                            y.push({
                                value : x[i].code,
                                label : x[i].name
                            })
                        }
                        setVariable(y);
                    }
                    if(setVariable === setOrganizationTypes)
                    {
                        let x = res.data.organizationtypes;
                        let y = [];
                        for(let i = 0; i < x.length; i++)
                        {
                            y.push({
                                value : x[i].code,
                                label : x[i].name
                            })
                        }
                        setVariable(y);
                    }
                }
                if(res.data.mtype === "warning")
                {
                    setVariable([]);
                }
                setLoading(false);
            }
            catch(ex) {
                setVariable([]);
                setLoading(false);
            }}

    return {
    roles,
    loading,
    organizationTypes,
    educationTypes,
    skillTypes,
    specializationTypes,
    setSpecializationTypes,
    conditionalFetchFunction
    }
}
export default MasterHook
