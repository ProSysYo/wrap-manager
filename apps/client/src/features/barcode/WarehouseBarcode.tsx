import { Input, List } from "antd";
import { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openNotification } from "../../common/notification";
import { markDateWarehouse } from "./barcodeSlice";

export const WarehouseBarcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);

    const inputFIO = useRef<Input>(null);
    const inputBarcode = useRef<Input>(null);

    const pressEnterBarcodeField = () => {
        inputFIO.current?.focus();
    };

    const pressEnterOtdelochnikField = async () => {
        if (!inputBarcode.current?.state.value || !inputFIO.current?.state.value) {
            return openNotification("error", "Не хватает данных");            
        }
        const res = await dispatch(
            markDateWarehouse({
                serial: inputBarcode.current?.state.value,
                codeOtdelochnik: inputFIO.current?.state.value,
            })
        ).unwrap();
        if (res.data) {
            inputBarcode.current?.setValue("");
            inputFIO.current?.setValue("");
            inputBarcode.current?.focus();
        }
        
    };

    return (
        <>
            <MyInput
                placeholder="Считайте штрихкод наряда"
                size="large"
                ref={inputBarcode}
                autoFocus
                onPressEnter={pressEnterBarcodeField}
            />

            <MyInput
                placeholder="Считайте штрихкод отделочника"
                size="large"
                ref={inputFIO}
                onPressEnter={pressEnterOtdelochnikField}
            />

            <span>Обработанные штрихкоды:</span>
            <List
                size="small"
                bordered
                pagination={{ pageSize: 10 }}
                dataSource={barcode.readedCodes}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
};

const MyInput = styled(Input)`
    margin-bottom: 50px;
`;
