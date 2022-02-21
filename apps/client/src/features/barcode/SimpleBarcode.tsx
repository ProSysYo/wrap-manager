import { Input, List } from "antd";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openNotification } from "../../common/notification";
import { barcodeActions, markDate } from "./barcodeSlice";

export const SimpleBarcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);
    const barcodeRef = useRef<Input>(null);

    useEffect(() => {
        return () => {
            dispatch(barcodeActions.rebootPartState());
        };
    }, [dispatch]);

    const pressEnter = async () => {
        const readedCode = barcodeRef.current?.state.value;
        if (!barcode.field || !readedCode) {
            openNotification("error", "Не хватает данных");
            return;
        }

        const res = await dispatch(markDate({ serial: readedCode, field: barcode.field })).unwrap();
        if (res.data) {
            barcodeRef.current?.setValue("");
        }
    };

    return (
        <>
            <MyInput
                ref={barcodeRef}
                placeholder="Считайте штрихкод в это поле"
                size="large"
                autoFocus
                onPressEnter={pressEnter}
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
