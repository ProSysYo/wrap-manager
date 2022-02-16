import { useEffect } from "react";
import { VirtualTable } from "./VirtualTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDoors } from "./doorSlice";

export const Doors = () => {
    const dispatch = useAppDispatch();
    const { door } = useAppSelector((state) => state);
    useEffect(() => {
        dispatch(getDoors());
    }, []);

    const columns = [
        { title: "id", dataIndex: "id", width: 50 },
        { title: "Серия", dataIndex: "serial", width: 100 },
        { title: "Порядк. номер", dataIndex: "ordinalNumber", width: 120 },
        {
            title: "Код заказчика",
            width: 150,
            dataIndex: ["order", "codeCustomer"],
            filters: [
                { text: "D007",value: "D007" },
                { text: "D008", value: "D008" },
                { text: "D012", value: "D012" },
            ],
            onFilter: (value: any, record: any) => record.order.codeCustomer === value,
        },
        { title: "Имя заказчика", width: 200, dataIndex: ["order", "nameCustomer"] },        
        { title: "Номер заказчика", width: 250, dataIndex: ["order", "numberCustomer"] },
        { title: "Партийность", width: 120, dataIndex: ["order", "party"] },
        { title: "Менеджер", width: 120, dataIndex: ["order", "manager"] },
        { title: "Модель полотна", width: 120, dataIndex: ["order", "modelPolotno"] },
        { title: "Модель короба", width: 120, dataIndex: ["order", "modelCorob"] },
        { title: "Высота", width: 100, dataIndex: ["order", "height"] },
        { title: "Ширина", width: 100, dataIndex: ["order", "width"] },
        { title: "Петли", width: 100, dataIndex: ["order", "hinge"] },
        { title: "Осн. замок", width: 200, dataIndex: ["order", "baseLock"] },
        { title: "Осн. наклад.", width: 200, dataIndex: ["order", "padBaseLock"] },
        { title: "Ручка", width: 200, dataIndex: ["order", "handle"] },
        { title: "Осн. цил.", width: 200, dataIndex: ["order", "cylinderBaseLock"] },
        { title: "Доп. замок", width: 200, dataIndex: ["order", "optionalLock"] },
        { title: "Доп. накл.", width: 200, dataIndex: ["order", "padOptionalLock"] },
        { title: "Доп. цил.", width: 200, dataIndex: ["order", "cylinderOptionalLock"] },
        { title: "Засов", width: 200, dataIndex: ["order", "bolt"] },
        { title: "Глазок", width: 200, dataIndex: ["order", "eye"] },
        { title: "Цвет", width: 200, dataIndex: ["order", "colorDoor"] },
        { title: "Тип отд. снар.", width: 200, dataIndex: ["order", "typeDecorationOutside"] },
        { title: "Цвет пл. снар", width: 200, dataIndex: ["order", "colorDecorationOutside"] },
        { title: "Цвет пат. снар.", width: 200, dataIndex: ["order", "patinaDecorationOutside"] },
        { title: "Фрез. снар.", width: 200, dataIndex: ["order", "decorationOutside"] },
        { title: "Тип отд. внутри", width: 200, dataIndex: ["order", "typeDecorationInside"] },
        { title: "Цвет пл. внутри", width: 200, dataIndex: ["order", "colorDecorationInside"] },
        { title: "Цвет пат. внутри", width: 200, dataIndex: ["order", "patinaDecorationInside"] },
        { title: "Фрез. внутри", width: 200, dataIndex: ["order", "decorationInside"] },
        { title: "Окно", width: 200, dataIndex: ["order", "window"] },
        { title: "Высота окна", width: 200, dataIndex: ["order", "heightWindow"] },
        { title: "Ширина окна", width: 200, dataIndex: ["order", "widthWindow"] },
        { title: "Толщ. окна", width: 200, dataIndex: ["order", "thickWindow"] },
        { title: "ччччч", width: 200, dataIndex: ["order", "ччч"] },
        { title: "ччччч", width: 200, dataIndex: ["order", "ччччч"] },
        { title: "ччччч", width: 200, dataIndex: ["order", "ччччч"] },
        { title: "ччччч", width: 200, dataIndex: ["order", "ччччч"] },
    ];

    return (
        <div>
            <VirtualTable columns={columns} dataSource={door.doors} scroll={{ y: 750, x: "100vw" }} />
        </div>
    );
};
