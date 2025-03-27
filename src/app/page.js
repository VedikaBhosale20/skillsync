'use client'

import React, { useState } from 'react';
import { 
  RobotOutlined, 
  UserOutlined, 
  BulbOutlined,
  StarOutlined
} from '@ant-design/icons';
import { 
  Card, 
  Button, 
  Modal, 
  Input, 
  Typography, 
  Row, 
  Col 
} from 'antd';
import RegisterForm from '@/components/forms/RegisterForm';

const { Title, Paragraph } = Typography;

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.location.replace('auth');
  }

  const features = [
    {
      icon: <RobotOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      title: "AI-Powered Interview",
      description: "Leverage advanced AI to gain deep insights into workforce potential and performance."
    },
    {
      icon: <UserOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      title: "Talent Management",
      description: "Streamline recruitment, onboarding, and employee development processes."
    },
    {
      icon: <BulbOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      title: "Smart Recommendations",
      description: "Receive intelligent suggestions for skill development and career paths."
    },
    {
      icon: <StarOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      title: "AI Proctored Exam",
      description: "Exams created by AI and proctored by AI to ensure integrity and fairness."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Title level={1} className="!text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            SkillSync AI
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Revolutionize your HR processes with intelligent AI-driven insights and recommendations
          </Paragraph>
          
          <div className="flex justify-center space-x-4">
            <Button 
              type="primary" 
              size="large"
              onClick={showModal}
            >
              Get Started
            </Button>
            <Button 
              size="large"
              ghost
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <Row gutter={[24, 24]} justify="center">
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card 
                hoverable
                className="text-center"
                cover={
                  <div className="pt-6 flex justify-center">
                    {feature.icon}
                  </div>
                }
              >
                <Card.Meta 
                  title={<h3 className="text-xl">{feature.title}</h3>}
                  description={feature.description}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Demo Modal */}
        <Modal
          title="Welcome to SkillSync AI"
          open={isModalVisible}
          onCancel={handleCancel}
          okText="Login"
          onOk={handleOk}
        >
          <Paragraph>
            Ready to transform your HR processes? Register to get started.
          </Paragraph>
          <RegisterForm />
        </Modal>
      </div>
    </div>
  );
}