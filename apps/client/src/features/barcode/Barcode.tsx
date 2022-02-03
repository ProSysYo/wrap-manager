import { Select } from "antd";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barcodeActions } from "./barcodeSlice";
import { ShipmentBarcode } from "./ShipmentBarcode";
import { SimpleBarcode } from "./SimpleBarcode";
import { WarehouseBarcode } from "./WarehouseBarcode";

const zones = [
    { field: "dateGiveMetall", name: "Отдано металл" },
    { field: "dateGivePanel", name: "Отдано панель" },
    { field: "dateMadeDirty", name: "Грязный стенд" },
    { field: "dateMadePaint", name: "Покраска" },
    { field: "datePackaging", name: "Упаковка" },
    { field: "dateShipment", name: "Отгрузка" },
    { field: "dateOtdelochnik", name: "Выдача наряда склад" },
    { field: "чч", name: "Отдано сторонние панели" },
    { field: "чч", name: "Упаковка сторонних панелей" },
];

export const Barcode = () => {
    const dispatch = useAppDispatch();
    const barcode = useAppSelector((state) => state.barcode);

    return (
        <Container>
            <FirstColumn>
                <h1>Выберите участок штриховки</h1>

                <MySelect
                    placeholder="Выберите участок"
                    size="large"
                    value={barcode.field}
                    onSelect={(value: any) => dispatch(barcodeActions.setZone(value))}
                >
                    <Select.Option value="" disabled={true}>
                        Выберите участок
                    </Select.Option>
                    {zones.map((item, index) => (
                        <Select.Option key={index} value={item.field}>
                            {item.name}
                        </Select.Option>
                    ))}
                </MySelect>
            </FirstColumn>
            <SecondColumn>
                {!barcode.field && <></>}
                {barcode.field === "dateGiveMetall" && <SimpleBarcode />}
                {barcode.field === "dateGivePanel" && <SimpleBarcode />}
                {barcode.field === "dateMadeDirty" && <SimpleBarcode />}
                {barcode.field === "dateMadePaint" && <SimpleBarcode />}
                {barcode.field === "datePackaging" && <SimpleBarcode />}
                {barcode.field === "dateShipment" && <ShipmentBarcode/>}
                {barcode.field === "dateOtdelochnik" && <WarehouseBarcode />}
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
