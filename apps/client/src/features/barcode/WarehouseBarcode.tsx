import { Input, List } from "antd";
import { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barcodeActions, markDateWarehouse } from './barcodeSlice';

export const WarehouseBarcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);
    
    const inputFIO = useRef<Input>(null);
    const inputBarcode = useRef<Input>(null)

    const pressEnterBarcodeField = () => {
        inputFIO.current?.focus();             
    };

    const pressEnterOtdelochnikField = () => {
        dispatch(markDateWarehouse({serial: barcode.simpleCode, codeOtdelochnik: barcode.codeOtdelochnik}))
        inputBarcode.current?.focus();
    }

    return (
        <>
            <MyInput
                placeholder="Считайте штрихкод наряда"
                size="large"
                ref={inputBarcode}
                autoFocus
                value={barcode.simpleCode}
                onChange={(e) => dispatch(barcodeActions.setSimpleCode(e.target.value))}
                onPressEnter={pressEnterBarcodeField}
            />

            <MyInput
                placeholder="Считайте штрихкод отделочника"
                size="large"
                ref={inputFIO}
                value={barcode.codeOtdelochnik}
                onChange={(e) => dispatch(barcodeActions.setCodeOtdelochnik(e.target.value))}
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
