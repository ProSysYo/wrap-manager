import { Layout, Menu } from "antd";
import React from "react";
import styled from "styled-components";

import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const {  Sider } = Layout;

export const MySider = () => {
    return (
        <>
            <Sider breakpoint="md" collapsedWidth="100">
                <Logo>База 2.0</Logo>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/">Главный</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <Link to="/barcode">Штриховка</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                        <Link to="/doors">Двери</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<VideoCameraOutlined />}>
                        <Link to="/outPanels">Сторонние панели</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
};

const Logo = styled.div`
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
`;