'use client'
import React from "react";
import { Flex, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };

  const AuthLayout = ({ children }) => {
    return(
    <Flex gap='middle' wrap>
      <Layout>
        {/* <Header style={headerStyle}>Header</Header> //navbar which i will make in the components folder  */}
        <Content>{children}</Content>
      </Layout>
  </Flex>
    )}
  export default AuthLayout