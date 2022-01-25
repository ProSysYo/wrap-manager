import { useAppSelector } from "./app/hooks";

import styled from "styled-components";
import { Button, Layout, Menu, Popover, Spin } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Login } from "./features/auth/Login";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.isAuth === null) {
        return <StyledSpin size="large" />;
    }
    return (
        <>
            {auth.isAuth ? (
                <StyledLayout>
                    <Sider
                        breakpoint="md"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => console.log(broken)}
                        onCollapse={(collapsed, type) =>
                            console.log(collapsed, type)
                        }
                    >
                        <Logo>Учет пленки</Logo>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                        >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                Расход пленки
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                Пленка Склад
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <StyledHeader>
                            <StyledPopover
                                content={
                                    <Button
                                        onClick={() => console.log("leave")}
                                        type="text"
                                    >
                                        Выйти
                                    </Button>
                                }
                                trigger="click"
                                placement="bottom"
                                className="popover"
                                // visible={visible}
                                // onVisibleChange={handleVisibleChange}
                            >
                                <Avatar icon={<UserOutlined />} />
                                <UserName>Ламинация внутренние</UserName>
                            </StyledPopover>
                        </StyledHeader>
                        <StyledContent> Content </StyledContent>
                        <StyledFooter>©2022 Created by ProSys</StyledFooter>
                    </Layout>
                </StyledLayout>
            ) : (
                <StyledLayout>
                    <Login/>
                </StyledLayout>
            )}
        </>
    );
};

export default App;

const StyledSpin = styled(Spin)`
    position: absolute;
    left: 50%;
    top: 50%;
`;

const StyledContent = styled(Content)`
    height: 100%-10px;
    width: 100%-10px;
    margin: 10px;
    padding: 5px;
    background: #fff;
`;

const StyledLayout = styled(Layout)`
    height: 100vh;
    width: 100vw;
`;

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

const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
`;

const StyledFooter = styled(Footer)`
    text-align: center;
`;

const UserName = styled.span`
    margin-left: 10px;
`;

const StyledPopover = styled(Popover)`
    :hover {
        cursor: pointer;
    }
`;
