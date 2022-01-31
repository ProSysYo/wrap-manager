import { Avatar, Button, Layout, Popover } from "antd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authActions } from "../features/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const MyHeader = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    return (
        <>
            <StyledHeader>
                <StyledPopover
                    content={
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            type="text"
                        >
                            Выйти
                        </Button>
                    }
                    trigger="click"
                    placement="bottom"
                >
                    <Avatar icon={<UserOutlined />} />
                    <UserName>{auth.user?.name}</UserName>
                </StyledPopover>
            </StyledHeader>
        </>
    );
};

const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
`;

const StyledPopover = styled(Popover)`
    :hover {
        cursor: pointer;
    }
`;
const UserName = styled.span`
    margin-left: 10px;
`;
