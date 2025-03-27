'use client'
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";

// UI components
import { Flex, Layout, Menu } from "antd";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/navbar/Navbar";

const { Header, Footer, Content, Sider } = Layout;


  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };

const HrAdminLayout = ({ children }) => {
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
      try {
        const data = JSON.parse(localStorage.getItem("userData"));
        setUserData(data);
      } catch(err) {
        console.error("Error Parsing user data:", err);
      }
    }, []);
  
    React.useEffect(() => {
      if (userData === null) {
        toast("Please Login First", {
          duration: 4000,
          icon: '🔔',
        });
      }
    }, [userData]);
if(userData !== null && userData.rolename === "hradmin")
    return(
        <Flex gap='middle' wrap>
          <Layout>
              <Navbar />
            <Layout>
              <Sider width={200}>
                <Sidebar />
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    borderRadius: 20,
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Flex>
      )

    return(
        <div className="min-h-screen flex items-center justify-center bg-blueGray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blueGray-700">Authentication Required</h2>
          <p className="mb-4 text-blueGray-500">Please log in to access this page.</p>
          <Link 
            href="/auth"
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
}

  export default HrAdminLayout