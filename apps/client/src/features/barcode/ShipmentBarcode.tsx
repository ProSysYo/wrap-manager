import { Input, List } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';


export const ShipmentBarcode = () => {
    const [barcode, setBarcode] = useState<string>("")   
    const [barcodes, setBarcodes] = useState<string[]>([])

    const pressEnter = async () => {
        setBarcodes([...barcodes, barcode]);
        setBarcode("")         
    }

    return (
        <>
            <MyInput
                placeholder="Считайте штрихкод в это поле"
                size="large"
                autoFocus
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onPressEnter={pressEnter}
            />

            <span>Считанные штрихкоды:</span>
            <List
                size="small"
                bordered
                pagination={{pageSize: 10}}
                dataSource={barcodes}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <p>{barcodes.length}</p>
        </>
    );
};

const MyInput = styled(Input)`
    margin-bottom: 50px;
`;
