import { Input, List } from "antd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barcodeActions } from './barcodeSlice';

const data: string[] = [];

export const SimpleBarcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);

    const aaa = (e: any) => {
        console.log(e);
        
        dispatch(barcodeActions.setSimpleCode(e.target.value))

    }
    return (
        <>
            <MyInput
                placeholder="Считайте штрихкод в это поле"
                size="large"
                autoFocus
                value={barcode.simpleCode}
                onPressEnter={aaa}
            />

            <span>Обработанные штрихкоды:</span>
            <List
                size="small"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
};

const MyInput = styled(Input)`
    margin-bottom: 50px;
`;
