import { Select } from "antd";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { barcodeActions } from './barcodeSlice';
import { SimpleBarcode } from './SimpleBarcode';

const zones = [
    { value: "giveMetall", name: "Отдано металл" },
    { value: "givePanel", name: "Отдано панель" },
    { value: "madeDirty", name: "Грязный стенд" },
    { value: "madePaint", name: "Покраска" },
    { value: "packaging", name: "Упаковка" },
    { value: "shipment", name: "Отгрузка" },
    { value: "warehouse", name: "Выдача наряда склад" },
];

export const Barcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);

    return (
        <Container>
            <FirstColumn>
                <h1>Сначала выберите участок штриховки</h1>

                <MySelect
                    placeholder="Выберите участок"
                    size="large"
                    value={barcode.zone}
                    onSelect={(value: any) => dispatch(barcodeActions.setZone(value))}
                >
                    <Select.Option value="" disabled={true}>Выберите участок</Select.Option>
                    {zones.map((item, index) => (
                        <Select.Option key={index} value={item.value}>
                            {item.name}
                        </Select.Option>
                    ))}
                </MySelect>
            </FirstColumn>
            <SecondColumn>
                {!barcode.zone &&  <></> }
                {barcode.zone === "giveMetall" && <SimpleBarcode/>}
                {barcode.zone === "givePanel" &&  <SimpleBarcode/>}
                {barcode.zone === "madeDirty" &&  <SimpleBarcode/>}
                {barcode.zone === "madePaint" &&  <SimpleBarcode/>}
                {barcode.zone === "packaging" &&  <SimpleBarcode/>}
                {barcode.zone === "shipment" && <p>Двери + панели</p>}
                {barcode.zone === "warehouse" && <p>Дверь + отделочник</p>}
            </SecondColumn>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;

const MySelect = styled(Select)`
    width: 100%;
    margin-bottom: 20px;
    font-size: 20px;
`;

const FirstColumn = styled.div`
    width: 30%;
    margin-right: 100px;
`;

const SecondColumn = styled.div`
    width: 40%;
    margin: 10px;
    margin-top: 35px;
`;
