import { Button, Divider, Form, Input } from "antd";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";

import { login } from "./authSlice";
export const Login = () => {
    const dispatch = useAppDispatch();
    const onFinish = (values: any) => {
        dispatch(login(values))       
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Container>
            <Form
                name="login"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Divider>Авторизация</Divider>    
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Введите логин' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>                

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">Войти</Button>
                </Form.Item>
            </Form>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 25%;
    height:30%;
    border: 1px solid grey;
    border-radius: 5px;
    margin: auto;
`;