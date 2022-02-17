import { useEffect } from "react";
import { VirtualTable } from "./VirtualTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDoors } from "./doorSlice";

export const Doors = () => {
    const dispatch = useAppDispatch();
    const { door } = useAppSelector((state) => state);
    useEffect(() => {
        dispatch(getDoors());
    }, [dispatch]);

    const columns = [
        { title: "id", dataIndex: "id", width: 50 },
        { title: "Серия", dataIndex: "serial", width: 100 },
        { title: "Порядк. номер", dataIndex: "ordinalNumber", width: 120 },
        {
            title: "Код заказчика",
            width: 150,
            dataIndex: ["order", "codeCustomer"],
            filters: door.codeCustomerFilters,
            onFilter: (value: any, record: any) => record.order.codeCustomer === value,
        },
        {
            title: "Имя заказчика",
            width: 200,
            dataIndex: ["order", "nameCustomer"],
            filters: door.nameCustomerFilters,
            onFilter: (value: any, record: any) => record.order.nameCustomer === value,
        },
        { title: "Номер заказчика", width: 250, dataIndex: ["order", "numberCustomer"] },
        { title: "Партийность", width: 120, dataIndex: ["order", "party"] },
        { title: "Менеджер", width: 120, dataIndex: ["order", "manager"] },
        { title: "Модель полотна", width: 120, dataIndex: ["order", "modelPolotno"] },
        { title: "Модель короба", width: 120, dataIndex: ["order", "modelCorob"] },
        { title: "Высота", width: 100, dataIndex: ["order", "height"] },
        { title: "Ширина", width: 100, dataIndex: ["order", "width"] },
        { title: "Петли", width: 100, dataIndex: ["order", "hinge"] },
        {
            title: "Осн. замок",
            width: 200,
            dataIndex: ["order", "baseLock"],
            filters: door.baseLockFilters,
            onFilter: (value: any, record: any) => record.order.baseLock === value,
        },
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
        { title: "Окно", width: 150, dataIndex: ["order", "window"] },
        { title: "Высота окна", width: 100, dataIndex: ["order", "heightWindow"] },
        { title: "Ширина окна", width: 100, dataIndex: ["order", "widthWindow"] },
        { title: "Толщ. окна", width: 100, dataIndex: ["order", "thickWindow"] },
        { title: "Цвет окна", width: 150, dataIndex: ["order", "colorWindow"] },
        { title: "Цвет ковки", width: 150, dataIndex: ["order", "colorKovkaWindow"] },
        { title: "Цвет патины", width: 150, dataIndex: ["order", "patinaKovkaWindow"] },
        { title: "Уплотнитель", width: 200, dataIndex: ["order", "seal"] },
        { title: "Уши", width: 150, dataIndex: ["order", "ear"] },
        { title: "Доводчик", width: 100, dataIndex: ["order", "closer"] },
        { title: "Усиление под дов.", width: 100, dataIndex: ["order", "forceCloser"] },
        { title: "Отверстия в коробе", width: 150, dataIndex: ["order", "holeBox"] },
        { title: "Тип петель", width: 120, dataIndex: ["order", "typeHinge"] },
        { title: "Три петли", width: 100, dataIndex: ["order", "trioHinge"] },
        { title: "Порог из нерж", width: 100, dataIndex: ["order", "steelDoorStep"] },
        { title: "Задний лист", width: 100, dataIndex: ["order", "backSheet"] },
        { title: "Наличник", width: 120, dataIndex: ["order", "frame"] },
        { title: "Двустворчатая", width: 150, dataIndex: ["order", "twoDoor"] },
        { title: "Упаковка", width: 120, dataIndex: ["order", "package"] },
        { title: "Примечание", width: 400, dataIndex: ["order", "note"] },
        { title: "Дата создания", width: 120, dataIndex: ["order", "dateCreate"] },
        { title: "Ширина р. створ.", width: 100, dataIndex: ["order", "widthTwoDoor"] },
        { title: "Метал короб", width: 100, dataIndex: ["order", "metalBox"] },
        { title: "Металл полотно", width: 100, dataIndex: ["order", "metalPolotno"] },
        { title: "Толщина полотна", width: 100, dataIndex: ["order", "thickPolotno"] },
        { title: "Термо кабель", width: 100, dataIndex: ["order", "thermoCable"] },
        { title: "Паспорт", width: 150, dataIndex: ["order", "passport"] },
        { title: "Эксцентрик", width: 100, dataIndex: ["order", "eccentric"] },
        { title: "Электромагнит", width: 100, dataIndex: ["order", "electromagnet"] },
        { title: "Подсветка", width: 100, dataIndex: ["order", "illumination"] },
        { title: "Левая полка", width: 150, dataIndex: ["order", "leftPolka"] },
        { title: "Правая полка", width: 150, dataIndex: ["order", "rightPolka"] },
        { title: "Фрамуга", width: 150, dataIndex: ["order", "framuga"] },
        { title: "Звукоизоляция", width: 100, dataIndex: ["order", "soundInsulation"] },
        { title: "Цвет наличника", width: 120, dataIndex: ["order", "colorFrame"] },
    ];

    return (
        <div>
            <VirtualTable
                columns={columns}
                dataSource={door.doors}
                loading={door.status === "loading" ? true : false}
                scroll={{ y: 750, x: "100vw" }}
            />
        </div>
    );
};
