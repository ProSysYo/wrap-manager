import { notification } from 'antd'

export const openNotification = (type: "success" | "error", message: string) => {    
    notification[type]({ message: type==="error"? "Ошибка" : "Успешно", description: message, style: {width: 500}});
}