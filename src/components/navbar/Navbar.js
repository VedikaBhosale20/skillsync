"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { handleLogout } from "@/lib/features/auth/AuthSlice";
import { useDispatch } from "react-redux";

const { Header } = Layout;


const Navbar = () => {
    const [userData, setUserData] = React.useState(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
      try {
        const data = JSON.parse(localStorage.getItem("userData"));
        setUserData(data);
      } catch(err) {
        console.error("Error Parsing user data:", err);
      }
    }, []);


    const router = useRouter();

    const handleNavigation = (userrole) => {
        switch (userrole) {
          case "superadmin":
            router.push("/admin");
            break;
          case "hradmin":
            router.push("/hradmin");
            break;
          case "hruser":
            router.push("/hruser");
            break;
          case "student":
            router.push("/student");
            break;
          default:
            router.push("/");
        }
      };

    const navbarStyle = {
        backgroundColor: "#4096ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      };
      
      const menuItems = userData
      ? [{ key: "1", label: <a href="#" onClick={handleNavigation(userData.rolename)}>Home</a> }]
      : [];
      
      const userMenu = (
        <Menu
          items={[
            { key: "profile", label: <a href="/profile">Profile</a> },
            { key: "logout", label: <a href="#" onClick={() => dispatch(handleLogout())}>Logout</a> },
          ]}
        />
      );
  return (
    <Header style={navbarStyle}>
      {/* Desktop Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#4096ff" }}
      />

      {/* User Dropdown (Fixed) */}
      <Dropdown overlay={<div>{userMenu}</div>} placement="bottomRight">
        <Button shape="circle" icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
};

export default Navbar;