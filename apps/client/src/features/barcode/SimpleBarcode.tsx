import { Input, List } from "antd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openNotification } from "../../common/notification";
import { barcodeActions, markDate } from './barcodeSlice';


export const SimpleBarcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);

    const pressEnter = async () => {
        if (!barcode.field || !barcode.simpleCode) {
            openNotification("error", "Не хватает данных")
            return
        }

        dispatch(markDate({serial: barcode.simpleCode, field: barcode.field}))        
    }

    return (
        <>
            <MyInput
                placeholder="Считайте штрихкод в это поле"
                size="large"
                autoFocus
                value={barcode.simpleCode}
                onChange={(e) => dispatch(barcodeActions.setSimpleCode(e.target.value))}
                onPressEnter={pressEnter}
            />

            <span>Обработанные штрихкоды:</span>
            <List
                size="small"
                bordered
                pagination={{pageSize: 10}}
                dataSource={barcode.readedCodes}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
};

const MyInput = styled(Input)`
    margin-bottom: 50px;
`;
