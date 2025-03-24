'use client'
import React from "react";
import { Flex, Layout } from "antd";
import Sidebar from "@/components/dashboard/Sidebar";

const { Header, Footer, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };

  const Superadmin = ({ children }) => {

    <Flex gap='middle' wrap>
        <Layout style={layoutStyle}>
        <Sidebar />
      <Layout>
        <Header style={headerStyle}>Header</Header> //navbar which i will make in the components folder 
        <Content style={contentStyle}>{children}</Content> 
        <Footer style={footerStyle}>Footer</Footer>  //footer which i will make in the components folder as per role
      </Layout>
    </Layout>
  </Flex> 
    

  }

  export default Superadmin