import { Button, Input, List, Modal } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { useAppDispatch } from '../../app/hooks';
import { packagePanels } from "./barcodeSlice";

export const PackagePanelBarcode = () => {
    const componentRef = useRef(null);
    const dispatch = useAppDispatch();

    const [barcode, setBarcode] = useState<string>("");
    const [barcodes, setBarcodes] = useState<string[]>([]);

    const pressEnter = (el: any) => {
        if (barcodes.length === 6) {
            setBarcode("");
            return Modal.error({
                title: "Предупреждение",
                content: "Нельзя выбрать больше 6 панелей",
            });
        }

        const val = el.target.value;
        setBarcodes([...barcodes, val]);
        setBarcode("");
    };

    const beforPrint = async () => {
        await dispatch(packagePanels(barcodes));
    };

    return (
        <Container>
            <MyInput
                placeholder="Считайте штрихкод в это поле"
                size="large"
                autoFocus
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onPressEnter={pressEnter}
            />

            <span>Считанные штрихкоды:</span>
            <List size="small" bordered dataSource={barcodes} renderItem={(item) => <List.Item>{item}</List.Item>} />

            <ReactToPrint
                onBeforeGetContent={beforPrint}
                trigger={() => <Button>Обработать</Button>}
                content={() => componentRef.current}
            />

            <PrintArea ref={componentRef}>
                <Row>
                    <QRCode value={""} size={100} />
                </Row>
            </PrintArea>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;

const MyInput = styled(Input)`
    margin-bottom: 10px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const PrintArea = styled.div`
    border: 1px solid grey;
    padding: 10px;
    width: 378px;
    height: 340;
    margin-top: 20px;
`;
