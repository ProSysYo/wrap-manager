import { Select } from "antd"

import { FC } from "react"
import { useAppSelector } from "../../app/hooks"


export const Door: FC = () => {
    const { door } = useAppSelector(state => state)

    return (
        <div>
            <Select placeholder="Выберите модель двери" style={{ width: 400 }}>
                {door.tables.models.map((item, index) => (
                    <Select.Option key={index} value={item.value}>{item.value}</Select.Option>
                ))}
            </Select>
        </div>
    )
}
