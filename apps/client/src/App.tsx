import { useAppDispatch, useAppSelector } from "./app/hooks";

import styled from "styled-components";
import { Layout, Spin } from "antd";
import { Login } from "./features/auth/Login";
import { useEffect } from "react";
import { authentication } from "./features/auth/authSlice";
import { MyHeader } from "./components/MyHeader";
import { MySider } from "./components/MySider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './features/home/Home';
import { Barcode } from './features/barcode/Barcode';
import { Doors } from './features/door/Doors';
import { Door } from "./features/door/Door";



const { Content, Footer } = Layout;

const App = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authentication());
        // eslint-disable-next-line
    }, []);

    if (auth.isAuth === null) {
        return <StyledSpin size="large" />;
    }
    return (
        <BrowserRouter>
            {auth.isAuth ? (
                <StyledLayout>
                    <MySider />
                    <Layout>
                        <MyHeader />
                        <StyledContent>
                            <Routes>
                                <Route path="/" element={<Home/>} />                              
                                <Route path="/barcode" element={<Barcode/>} />
                                <Route path="/doors" element={<Doors/>} />
                                <Route path="/door" element={<Door/>} />
                            </Routes>
                        </StyledContent>
                        <StyledFooter>©2022 Created by ProSys</StyledFooter>
                    </Layout>
                </StyledLayout>
            ) : (
                <StyledLayout>
                    <Login />
                </StyledLayout>
            )}
        </BrowserRouter>
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

const StyledFooter = styled(Footer)`
    text-align: center;
`;
